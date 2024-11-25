import Heading from "@/components/heading";
import { getMyBookings } from "../actions/get-my-bookings";
import BookedRoomCard from "@/components/booked-room-card";

const Bookings = async () => {
  
  const { error, bookings } = await getMyBookings();

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Heading title="My Bookings" />

      {bookings && bookings.length === 0 ? (
        <p className="text-gray-600 mt-4">You have no bookings</p>
      ) : (
        //@ts-ignore
        bookings?.map((booking: Booking) => (
          <BookedRoomCard booking={booking} key={booking.$id} />
        ))
      )}
    </>
  );
};

export default Bookings;
