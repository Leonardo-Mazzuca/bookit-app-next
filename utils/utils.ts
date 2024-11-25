

export const appwriteConfig = {
    apiKey: process.env.NEXT_PUBLIC_APPWRITE_KEY!,
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT!,
    baseUrl: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
    roomsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS!,
    roomsCollectionStorageBucket:process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOMS!,
    bookingsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS!
}