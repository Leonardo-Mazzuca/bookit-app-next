"use server";
import { createSessionClient } from "@/config/appwrite";
import { appwriteConfig } from "@/utils/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ID } from "node-appwrite";
import checkAuth from "./check-auth";
import { revalidatePath } from "next/cache";
import { checkRoomAvailability } from "./check-room-availability";

export async function bookRoom(prevState: any, formData: FormData) {
  const { databaseId, bookingsCollectionId } = appwriteConfig;

  const cookie = await cookies();

  const sessionCookie = cookie.get("appwrite-session");

  if (!sessionCookie) {
    redirect("/login");
  }

  try {
    const { databases } = await createSessionClient(sessionCookie.value);

    //Get user's ID
    const user = await checkAuth();

    if (!user) {
      return {
        error: "You must be logged in to book a room",
      };
    }

    //extract date and time from the formData

    const checkInDate = formData.get("check_in_date")?.toString();
    const checkInTime = formData.get("check_in_time")?.toString();

    const checkOutDate = formData.get("check_out_date")?.toString();
    const checkOutTime = formData.get("check_out_time")?.toString();

    //combine date and time to ISO 8601 format
    const checkInDateTime = `${checkInDate}T${checkInTime}`;
    const checkOutDateTime = `${checkOutDate}T${checkOutTime}`;
    const roomId = formData.get("room_id")?.toString();

    //Check if rooms is available

    const isAvailable = await checkRoomAvailability(
      roomId!,
      checkInDateTime,
      checkOutDateTime
    );

    if(!isAvailable){
        return {
            error: 'This room is already booked for this selected time!'
        }
    }

    const bookingData = {
      check_in: checkInDateTime,
      check_out: checkOutDateTime,
      user_id: user.user?.id,
      room_id: roomId,
    };

    //Create the actual booking

    const newBooking = await databases.createDocument(
      databaseId,
      bookingsCollectionId,
      ID.unique(),
      bookingData
    );

    revalidatePath("/bookings", "layout");

    return {
      success: true,
    };
  } catch (error) {
    console.log("failed to book room ", error);
    return {
      error: "Something went wrong booking the room",
    };
  }
}
