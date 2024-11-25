'use server'

import { createSessionClient } from "@/config/appwrite"
import { cookies } from "next/headers"



export default async function checkAuth () {

    const cookie = await cookies();

    const sessionCookie = cookie.get("appwrite-session");

    if(!sessionCookie){
        return {
            isAuthenticated: false
        }
    }

    try {

        //Get account instance
        const {account} = await createSessionClient(sessionCookie.value);

        //Check if user is logged in
        const user = await account.get();


        return {
            isAuthenticated: true,
            user: {
                id: user.$id,
                name: user.name,
                email: user.email,
            }
        }
        

        
    } catch (error) {
        return {
            isAuthenticated: false,
        }
    }

}