'use server'
import { createSessionClient } from "@/config/appwrite"
import { appwriteConfig } from "@/utils/utils"
import { cookies } from "next/headers";
import { redirect } from "next/navigation"
import { Query } from "node-appwrite";
import {DateTime} from 'luxon'

//COnvert date string to luxo date time obj in UTC
function toUTCDateTime (dateString:string){

    return DateTime.fromISO(dateString,{
        zone:'UTC',
    }).toUTC()
}

//Check for overlaping date ranges 
function dateRangesOverlap (checkInA: any, checkOutA:any,checkInB:any, checkOutB:any) {
    
    return checkInA < checkOutB && checkOutA > checkInB
}


export async function checkRoomAvailability(roomId: string,checkIn: string, checkOut:string) {

            
    const {databaseId,bookingsCollectionId} = appwriteConfig;

    const cookie = await cookies();

    const sessionCookie = cookie.get('appwrite-session');

    if(!sessionCookie){
        redirect('/login')
    }
    

    try {

        const {databases} = await createSessionClient(sessionCookie.value)

        const checkInDateTime = toUTCDateTime(checkIn)
        const checkOutDateTime = toUTCDateTime(checkOut)
        
        //Fecth all bookins to get room
        const {documents:bookings} = await databases.listDocuments(
            databaseId,
            bookingsCollectionId,
            [Query.equal('room_id', roomId)]
        )

        //loop over bookings and check for overlaps

        for(const booking of bookings){
            const bookingCheckInDateTime = toUTCDateTime(booking.check_in)
            const bookingCheckOutDateTime = toUTCDateTime(booking.check_out)

            if(dateRangesOverlap(checkInDateTime,checkOutDateTime,bookingCheckInDateTime,bookingCheckOutDateTime)){
                return false //Overlap found, do not book room
            }
            
        }

        //No overlap found continue to book
        return true
        
    } catch (error) {

        console.log('Failed to check availability: ', error);
        return {
            error: 'Failed to check availability'
        }
        
    }

}

