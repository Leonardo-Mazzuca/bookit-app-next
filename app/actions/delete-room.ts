'use server'
import { createSessionClient } from "@/config/appwrite"
import { appwriteConfig } from "@/utils/utils"
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation"
import { Query } from "node-appwrite";

export async function deleteRoom(roomId: string) {

            
    const {databaseId,roomsCollectionId} = appwriteConfig;

    const cookie = await cookies();

    const sessionCookie = cookie.get('appwrite-session');

    if(!sessionCookie){
        redirect('/login')
    }
    

    try {

        const {databases,account} = await createSessionClient(sessionCookie.value)

        
        //Get user's ID
        const user = await account.get();
        const userId = user.$id



        const {documents:rooms} = await databases.listDocuments(
            databaseId,
            roomsCollectionId,
            [Query.equal('user_id', userId)]
        )
        
        //find room to delete

        const roomToDelete = rooms.find(room => room.$id === roomId)

        //delete room
        if(roomToDelete){
            await databases.deleteDocument(databaseId,roomsCollectionId,roomToDelete.$id)


            revalidatePath('/rooms/my','layout')
            revalidatePath('/','layout')

            return {
                success: true
            }

        } else {
            return {
                error: 'Room not found'
            }
        }


        
    } catch (error) {

        console.log('Error deleting room ', error);
        return {
            error: 'Failed to delete room'
        }
        
    }

}

