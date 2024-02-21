import { getToken } from "next-auth/jwt";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export const middleware = async (req) => {
    const path = req.nextUrl.pathname;
    const token = await getToken({
        req: req,
        secret: process.env.NEXTAUTH_SECRET
    })

    const { nextUrl } = req;
    const publicPaths = path === "/" || path === "/register"
    console.log("token is", token, "  ", path);

    if (nextUrl.pathname === "/api/auth/signin") {
        return null;
    }
    if (!token && nextUrl.pathname != "/api/auth/signin") {
        return Response.redirect(new URL(`/api/auth/signin?callbackUrl=${nextUrl.pathname}`, nextUrl));
    }
    // if(token){
    //     if(token.userRole === "admin"){
    //         return Response.redirect(new URL("/admin", req.nextUrl));
    //     }
    //     if(token.userRole === "user"){
    //         return Response.redirect(new URL("/user", req.nextUrl));
    //     }
    // }











    // if (token) {

    // }
    // if (publicPaths) {
    //     if (token?.userRole === 'admin') {
    //         return NextResponse.redirect(new URL("/admin", req.nextUrl));
    //     } else {
    //         return NextResponse.redirect(new URL("/user", req.nextUrl));
    //     }
    // }
    // if (!path == "/" || !path == "/register") {
    //     if (token.userRole == 'admin') {
    //         return NextResponse.redirect(new URL("/admin", req.nextUrl));
    //         // return NextResponse.redirect(new URL("/", req.nextUrl));
    //     } else {
    //         return NextResponse.redirect(new URL("/user", req.nextUrl));
    //     }
    // }
    // if (!token) {
    //     return NextResponse.redirect(new URL("/", req.nextUrl));
    // }
    // if (token) {
    //     if (token.userRole == "admin") {
    //         return NextResponse.redirect(new URL("/admin", req.nextUrl));
    //     }
    // if (token.userRole == "user") {
    //     return NextResponse.redirect(new URL("/user", req.nextUrl));
    // }
    // return NextResponse.redirect(new URL("/user", req.nextUrl));
}
// if (!publicPaths && !token) {
//     // return NextResponse.redirect(new URL("/", req.nextUrl));
// }
// }

export const config = {
    matcher: ["/", "/admin", "/user"]
}