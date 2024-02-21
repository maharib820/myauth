import { connect } from "@/connectDB/connectDB";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/user";

export const POST = async (request) => {
    try {
        await connect();
        const bodyDatas = await request.json();
        const { name, email, password } = bodyDatas;
        console.log(name, email, password);

        const userExist = await User.findOne({ email });
        if (userExist) {
            return NextResponse.json({ error: "user already exist" }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            userRole: "user"
        });
        const savedUser = await newUser.save();

        return NextResponse.json({
            message: "user created successfully",
            success: true,
            savedUser
        })
        return NextResponse.json({ message: "post working" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}