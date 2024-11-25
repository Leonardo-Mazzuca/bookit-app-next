"use server";
import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";

export default async function destroySession() {
  //REtrive session cookie
  const cookie = await cookies();
  const sessionCookie = cookie.get("appwrite-session");

  if (!sessionCookie) {
    return {
      error: "No session cookie found",
    };
  }

  try {

    const {account} = await createSessionClient(sessionCookie.value);

    //Delete session
     await account.deleteSession('current');

     //Clear session cookie
     cookie.delete('appwrite-session');

     return {
        success: true
     }

  } catch (error: any) {
    console.log('Error deleting session: ', error);
    
    return {
      error: "Error deleting session",
    };
  }
}
