
import { getSigleRoom } from '@/app/actions/get-sigle-room'
import BookingForm from '@/components/booking-form'
import Heading from '@/components/heading'
import rooms from '@/data/rooms.json'
import { appwriteConfig } from '@/utils/utils'
import Image from 'next/image'
import Link from 'next/link'
import { FaChevronLeft } from 'react-icons/fa'

const Room = async ({params}:{params:{id:string}}) => {

  const {id} = params

  const {roomsCollectionStorageBucket,projectId} = appwriteConfig;

  const room = await getSigleRoom(id)

  if(!room){
    return (
      <Heading title='Room not found' />
    )
  }

  const imgUrl = `https://cloud.appwrite.io/v1/storage/buckets/${roomsCollectionStorageBucket}/files/${room.image}/view?project=${projectId}`

  const imageSrc = room.image ? imgUrl : '/images/no-image.jpg'
  
  return (

    <>
    
      <Heading title={room.name} />

      <div className="bg-white shadow rounded-lg p-6">
        <Link
          href="/"
          className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
        >
          <FaChevronLeft className='inline mr-1' />
          <span className="ml-2">Back to Rooms</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:space-x-6">
          <Image
            src={imageSrc}
            alt={room.name}
            className="w-full sm:w-1/3 h-64 object-cover rounded-lg"
            width={400}
            height={100}

          />

          <div className="mt-4 sm:mt-0 sm:flex-1">
            <p className="text-gray-600 mb-4">
              {room.description}
            </p>

            <ul className="space-y-2">
              <li>
                <span className="font-semibold text-gray-800">Size:</span> {room.sqft}sq ft
              </li>
              <li>
                <span className="font-semibold text-gray-800">Availability:</span>
                {room.availability}
              </li>
              <li>
                <span className="font-semibold text-gray-800">Price:</span>
                ${room.price_per_hour}/hour
              </li>
              <li>
                <span className="font-semibold text-gray-800">Address:</span> {room.address}
              </li>
            </ul>
          </div>
        </div>

        <BookingForm roomId={room.$id} />

      </div>
    
    </>
    
  )
}

export default Room