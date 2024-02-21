import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { connect } from "@/connectDB/connectDB";
import User from "@/models/user";
import bcryptjs from "bcryptjs";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                name: { label: "Username", type: "text", placeholder: "jsmdasdith" },
                password: { label: "Password", type: "password", placeholder: "424242" }
            },
            async authorize(credentials) {
                await connect();
                const {name:email, password} = credentials;
                const userData = await User.findOne({ email });
                console.log(userData._doc);
                const {email:emaill, name, password:passwordd, userRole} = userData._doc;
                const matchPassword = await bcryptjs.compare(credentials.password, passwordd);
                console.log(matchPassword);
                const user = { name: name, email: emaill, password: "123456", userRole: userRole }
                // const userr = { id: "2", name: "Jo Smith", email: "aluu@g.com", password: "12345", userRole: "user" }
                console.log(user);
                if (email === emaill && password) {
                    return user
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
            // async authorize(credentials) {
            //     const { email, password } = credentials;
            //     try {
            //         await connect();
            //         const user = await User.findOne({ email });
            //         if (!user) {
            //             return null;
            //         }
            //         const matchPassword = await bcryptjs.compare(password, user.password);
            //         if (!matchPassword) {
            //             return null;
            //         }
            //         return user;
            //     } catch (error) {
            //         console.log("error is: ", error);
            //     }
            // }
        })
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.name = user.name;
                token.email = user.email;
                token.userRole = user.userRole
            }
            console.log(token);
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.userRole = token.userRole;
            }
            return session;
        },
        // async signIn(user, account, profile) {
        //     if (user.userRole === 'admin') {
        //         return '/admin';
        //     } else {
        //         return '/user';
        //     }
        // }
    },
    secret: process.env.NEXTAUTH_SECRET,
    // pages: {
    //     signIn: "/"
    // }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };