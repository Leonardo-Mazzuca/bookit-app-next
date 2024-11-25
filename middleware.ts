
import { NextRequest, NextResponse } from "next/server";
import checkAuth from "./app/actions/check-auth";

export async function middleware (req:NextRequest) {

    const {isAuthenticated} = await checkAuth();

    //redirect to login if is not logged
    if(!isAuthenticated) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    return NextResponse.next()
    

}

export const config = {
    matcher: [
        '/bookings',
        '/rooms/add',
        '/rooms/my',
    ]
}