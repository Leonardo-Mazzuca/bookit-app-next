
import {Client,Databases,Account,Storage} from 'node-appwrite'

//Admin client

const createAdminClient = async () => {

    const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT
    const apiKey = process.env.NEXT_PUBLIC_APPWRITE_KEY
    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT

    const client = new Client()
    .setEndpoint(endpoint!) 
    .setProject(projectId!)          
    .setKey(apiKey!); 

    return {
        get account() {
            return new Account(client);
        },
        get databases() {
            return new Databases(client);
        },
        get storage() {
            return new Storage(client);
        },
        
    }

}

const createSessionClient = async (session:any) => {

    
    const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT
    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT

    const client = new Client()
    .setEndpoint(endpoint!) 
    .setProject(projectId!)          

    if(session){
        client.setSession(session)
    }

    return {
        get account() {
            return new Account(client);
        },
        get databases() {
            return new Databases(client);
        },

    }

}

export {createAdminClient,createSessionClient}