'use server'
import { createAdminClient } from "@/config/appwrite"
import checkAuth from "./check-auth"
import { ID } from "node-appwrite";
import { revalidatePath } from "next/cache";
import { appwriteConfig } from "@/utils/utils";


export default async function createRoom(prevState:any,formData:FormData) {

    //get databases and storage instances
    const {databases, storage} = await createAdminClient();

    

    try {

        const {databaseId,roomsCollectionId} = appwriteConfig;

        const {user} = await checkAuth();
        
        if(!user){
            return {
                error: 'You must me logged in to create a room'
            }
        }

        //uploading image
        let imageID;

        const image:any = formData.get('image');

        if(image && image.size > 0 && image.name !== 'undefined'){

            try {
                
                //try to upload
                const response = await storage.createFile('rooms',ID.unique(),image)

                imageID = response.$id

            } catch (error) {

                console.log('Error uploading image: ', error);
                
                return {
                    error: 'Error uploading image'
                }
            }

        } else {

            console.log('No image file provided or file is invalid');
            
        }

        

        const newRoom = await databases.createDocument(
            databaseId,
            roomsCollectionId,
            ID.unique(),
            {
                user_id: user.id,
                name: formData.get('name')?.toString(),
                description: formData.get('description')?.toString(),
                sqft: formData.get('sqft')?.toString(),
                capacity: formData.get('capacity')?.toString(),
                location: formData.get('location')?.toString(),
                address: formData.get('address')?.toString(),
                amenities: formData.get('amenities')?.toString(),
                availability: formData.get('availability')?.toString(),
                price_per_hour: formData.get('price_per_hour')?.toString(),
                image: imageID
                
            }
        )

        revalidatePath('/','layout')
        return {
            success: true
        }

        
    } catch (error:any) {

        console.log('Error creating room: ', error);
        const errMsg = error.response.message || 'Unknown error has occurred';

        return {
            error: errMsg
        }
        
    }
    
}