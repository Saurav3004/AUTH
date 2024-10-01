import mongoose,{Schema} from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true,"Name is required"],
        
    },
    email:{
        type: String,
        required: [true,"Email is required"],
        unique:true,
        trim: true
    },
    password:{
        type: String,
        required: false
    }
})

export const User = mongoose.models.User || mongoose.model('User',UserSchema)
