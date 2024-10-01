import mongoose from "mongoose";

export const dbConnect = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI || "",{})
        console.log("MONGODB CONNECTED",connect.connection.host)
    } catch (error) {
        console.log("ERROR WHILE CONNECTING DATABASE",error)
        process.exit(1)
    }
}