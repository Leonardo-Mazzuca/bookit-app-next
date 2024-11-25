'use client'

import { deleteRoom } from "@/app/actions/delete-room";
import { FaTrash } from "react-icons/fa"
import { toast } from "react-toastify";

const DeleteRoomButton = ({roomId}:{roomId:string}) => {

    const handleDelete = async () => {

        const confirm = window.confirm('Are you sure you want to delete this room?');
        
        if(confirm){
            
            const {success, error} = await deleteRoom(roomId)

            if(success){
                toast.success('Room deleted successfully')
            }

            if(error){
                toast.error(error)
            }

        }
    }

  return (

   
        <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-red-700"
    >
        <FaTrash className="inline mr-1"/> Delete
    </button>

  )
}

export default DeleteRoomButton