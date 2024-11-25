"use client";

import { cancelBooking } from "@/app/actions/cancel-booking";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const CancelBookingButton = ({ bookingId }: { bookingId: string }) => {

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (confirm) {
      const { success, error } = await cancelBooking(bookingId);

      if (success) {
        toast.success("Booking canceled successfully");
      }

      if (error) {
        toast.error(error);
      }
    }
  };


  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-red-700"
    >
      <FaTrash className="inline mr-1" /> Delete
    </button>
    
  );
};

export default CancelBookingButton;
