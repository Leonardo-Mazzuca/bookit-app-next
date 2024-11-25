'use server'
import { createSessionClient } from "@/config/appwrite"
import { appwriteConfig } from "@/utils/utils"
import { cookies } from "next/headers";
import { redirect } from "next/navigation"
import { Query } from "node-appwrite";

export async function getMyRooms() {

            
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
        

        return rooms

        
    } catch (error) {

        console.log('Erro ao pegar user rooms: ', error);
        redirect('/error')
        
    }

}

