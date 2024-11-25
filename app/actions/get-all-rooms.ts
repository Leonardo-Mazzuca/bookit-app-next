'use server'
import { createAdminClient } from "@/config/appwrite"
import { redirect } from "next/navigation"

export async function getAllRooms() {

            
    const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE!
    const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS!

    try {

        const {databases} = await createAdminClient()

    
        const {documents:rooms} = await databases.listDocuments(
            databaseId,
            collectionId
        )

        

        // revalidatePath('/','layout')

        return rooms

        
    } catch (error) {

        console.log('Erro ao pegar rooms: ', error);
        redirect('/error')
        
    }

}

