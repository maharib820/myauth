import mongoose from "mongoose";

export const connect = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI, {
            dbName: "myauth"
        });
        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log("connected with mongodb database");
        })
        console.log(mongoose.connection);
        connection.on("error", (error) => {
            console.log("can't connect with database: ", error);
        })
    } catch (error) {
        console.log("database connection failed");
        console.log("error is: ", error.message);
    }
}