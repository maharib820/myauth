import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true
    },
    password: {
        type: String
    },
    userRole: {
        type: String,
        required: [true, "userRole is required"]
    }
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;