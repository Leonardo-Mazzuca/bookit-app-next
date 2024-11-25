
'use server'
import { createAdminClient } from "@/config/appwrite"
import { redirect } from "next/navigation"

export async function getSigleRoom(roomId: string) {

            
    const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE!
    const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS!

    try {

        const {databases} = await createAdminClient()

    
        const room = await databases.getDocument(
            databaseId,
            collectionId,
            roomId
        )

        

        // revalidatePath('/','layout')

        return room

        
    } catch (error) {

        console.log('Erro ao pegar sala: ', error);
        redirect('/error')
        
    }

}

