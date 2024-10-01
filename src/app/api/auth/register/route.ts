import { dbConnect } from "@/database/dbConnect";
import { User } from "@/model/User";
import { registerSchema } from "@/validator/authSchema";
import ErrorReporter from "@/validator/errorReporter";
import vine, { errors } from "@vinejs/vine";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

dbConnect();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validator = vine.compile(registerSchema);
    const output = await validator.validate(body, {
      errorReporter: () => new ErrorReporter(),
    });

    const user = await User.findOne({ email: output.email });
    if (user) {
      return NextResponse.json(
        {
          status: 400,
          errors: {
            email: "Email is already taken",
          },
        },
        { status: 200 }
      );
    } else {
      const hashedPassword = bcrypt.hash(output.password, 10);
      output.password = await hashedPassword;
      
      await User.create(output);

      return NextResponse.json({
        status: 200,
        message: "Account created successfully"
      }, { status: 200 });
    }
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json(
        { status: 400, errors: error.messages },
        { status: 200 }
      );
    }
  }
}
