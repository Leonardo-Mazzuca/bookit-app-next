'use server'
import { createSessionClient } from "@/config/appwrite"
import { appwriteConfig } from "@/utils/utils"
import { cookies } from "next/headers";
import { redirect } from "next/navigation"
import { Query } from "node-appwrite";
import checkAuth from "./check-auth";

export async function getMyBookings() {

            
    const {databaseId,bookingsCollectionId} = appwriteConfig;

    const cookie = await cookies();

    const sessionCookie = cookie.get('appwrite-session');

    if(!sessionCookie){
        redirect('/login')
    }
    
    

    try {

        const {databases} = await createSessionClient(sessionCookie.value)

        
        //Get user's ID
        const {user} = await checkAuth();

        if(!user){
            return {
                error: 'You must be logged in to view your bookings'
            }
        }

        const userId = user.id

        const {documents:bookings} = await databases.listDocuments(
            databaseId,
            bookingsCollectionId,
            [Query.equal('user_id', userId)]
        )
        

        return {bookings}

        
    } catch (error) {

        console.log('Failed to get user bookings ', error);
        
        return {
            error: 'Failed to get bookings'
        }
        
    }

}

