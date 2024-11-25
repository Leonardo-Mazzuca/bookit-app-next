
import Heading from '@/components/heading';
import RoomCard from '@/components/room-card';
import { getAllRooms } from './actions/get-all-rooms';


export default async function Home() {

  const rooms = await getAllRooms();

  return (
    <>
    
      <Heading title='Available Rooms' />

      {rooms && rooms?.length > 0 ? (
        rooms.map((room)=> (
          //@ts-ignore
          <RoomCard key={room.$id} room={room} />
        ))
      ): (
        <p>
          NO rooms available at the moment
        </p>
      )}
    </>
  );
}
