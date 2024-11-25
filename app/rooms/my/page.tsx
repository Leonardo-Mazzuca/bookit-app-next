import { getMyRooms } from "@/app/actions/get-my-rooms";
import Heading from "@/components/heading";
import MyRoomCard from "@/components/my-room-card";

const MyRooms = async () => {

  const rooms = await getMyRooms();

  
  return (

    <>
      <Heading title="My Rooms" />

      {(rooms && rooms.length > 0) ? (

        rooms.map((room)=>(
            //@ts-ignore
            <MyRoomCard key={room.$id} room={room} />
        ))

      ) : (
        <p>
            You have no rooms listings.
        </p>
      )}

    </>

  );

};

export default MyRooms;
