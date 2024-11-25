'use server'
import { createAdminClient } from "@/config/appwrite"
import { cookies } from "next/headers"


export default async function createSession (prevState:any,formData:FormData) {

    const email = String(formData.get('email'))
    const password = String(formData.get('password'))

    if(!email || !password){
        return {
            error: 'Please fill out all fields'
        }
    }

    //Get account instance

    const {account} = await createAdminClient()

    try {
        
        //Generate sessionm


        const session = await account.createEmailPasswordSession(email,password)

        //Create cookie
        const cookie = await cookies()

        cookie.set('appwrite-session',session.secret,{
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            expires: new Date(session.expire),
            path: '/'
        })

        return {
            success: true
        }
    

    } catch (error:any) {

        console.log('Auth error: ', error);
        
        return {
            error: 'Invalid credentials'
        }
    }
    

  
}