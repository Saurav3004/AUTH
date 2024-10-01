import { User } from "@/model/User";
import vine, { errors } from "@vinejs/vine";
import { dbConnect } from "@/database/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "@/validator/authSchema";
import ErrorReporter from "@/validator/errorReporter";
import bcrypt from "bcryptjs";

dbConnect();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validator = vine.compile(loginSchema);
    const output = await validator.validate(body, {
      errorReporter: () => new ErrorReporter(),
    });

    const user = await User.findOne({ email: output.email });

    if (user) {
      const matchedPassword = bcrypt.compareSync(
        output.password,
        user.password
      );
      if (matchedPassword) {
        return NextResponse.json(
          {
            status: 200,
            message: "User Logged In",
          },
          { status: 200 }
        );
      }
      return NextResponse.json({
        status: 400,
        errors: {
          email: "Invalid credentials",
        },
      },{status:200});
    }
     
    return NextResponse.json({
        status: 400,
        errors: {
          email: "Invalid credentials",
        },
      },{status:200});
    
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json(
        { status: 400, errors: error.messages },
        { status: 200 }
      );
    }
  }
}