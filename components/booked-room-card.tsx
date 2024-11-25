import Link from "next/link";
import React from "react";
import CancelBookingButton from "./cancel-booking-button";

const BookedRoomCard = ({ booking }: { booking: Booking }) => {

  const { room_id: room } = booking;

  const formatDate = (dateString:string) => {

    const date = new Date(dateString);

    //Get month
    const month = date.toLocaleString('pt-BR', {
        timeZone:'UTC',
        month: 'short'
    })

    //get day
    const day = date.getUTCDate()

    //Format time in UTC 12-hour
    const time = date.toLocaleString('pt-BR', {
        timeZone:'UTC',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    })


    //return final formatted string
    return `${day} ${month} at ${time}`

  }

  return (
    <div className="bg-white shadow rounded-lg p-4 mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
      <div>
        <h4 className="text-lg font-semibold">{room.name}</h4>
        <p className="text-sm text-gray-600">
          <strong>Check In:</strong> {formatDate(booking.check_in)}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Check Out:</strong> {formatDate(booking.check_out)}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row w-full sm:w-auto sm:space-x-2 mt-2 sm:mt-0">
        <Link
          href={`/rooms/${room.$id}`}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-blue-700"
        >
          View Room
        </Link>
       
       <CancelBookingButton bookingId={booking.$id} />
      </div>
    </div>
  );
};

export default BookedRoomCard;
