'use server'

import { createAdminClient } from "@/config/appwrite"
import { ID } from "node-appwrite"

export default async function createUser(prevState:any,formData:FormData) {
    
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();
    const confirmPassword = formData.get('confirm-password')?.toString();
    const name = formData.get('name')?.toString();

    if(!email || !password || !name){
        return {
            error: 'Please fill out all fields'
        }
    }

    if(password.length < 8){
        return {
            error: 'Password must be at least 8 characters long'
        }
    }

    if(password!==confirmPassword){
        return {
            error: 'Passwords do not match'
        }
    }

    //Get account instance

    const {account} = await createAdminClient();

    try {

        await account.create(ID.unique(),email,password,name);
        
        return {
            success: true
        }
        
    } catch (error) {

        console.log('Error creating user: ', error);
        return {
            error: 'Error creating user'
        }
        
    }
}