'use server'
import { createSessionClient } from "@/config/appwrite"
import { appwriteConfig } from "@/utils/utils"
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import checkAuth from "./check-auth";



export async function cancelBooking(bookingId: string) {

            
    const {databaseId,bookingsCollectionId} = appwriteConfig;

    const cookie = await cookies();

    const sessionCookie = cookie.get('appwrite-session');

    if(!sessionCookie){
        return {
            error: 'You must be logged in to cance a booking'
        }
    }
    

    try {

        const {databases} = await createSessionClient(sessionCookie.value)

        
        //Get user's ID
        const {user} = await checkAuth();

        if(!user){
            return {
                error: 'User not found'
            }
        }

        const userId = user.id

        // get booking

        const booking = await databases.getDocument(databaseId,bookingsCollectionId,bookingId)

        //Check if booking belongs to current user


        if(booking.user_id !== userId){
            return {
                error: 'You are not authorized to cancel this booking'
            }
        }

        //Delete the booking
        await databases.deleteDocument(databaseId,bookingsCollectionId,booking.$id)
        revalidatePath('/bookings','layout')

        return {
            success: true
        }

        
    } catch (error) {

        console.log('Failed to cancel booking: ', error);
        return {
            error: 'Failed to cancel booking'
        }
        
    }

}

