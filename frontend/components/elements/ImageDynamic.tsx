import Image from "next/image";
import { useState } from "react";

const FRONTEND_URL = process.env.NEXT_PUBLIC_SITE_URI

type Props = {
  photoIn: {
    url:string
    altText:string,
  }|string|undefined,
}
// todo idk, just gonna not use the 'optimized' version on production for now
export function ImageDynamic({ photoIn }: Props) {
  

  const [state, setState] = useState<any>(handlePhoto(photoIn))


  return (
    <img
      src={state.image.url}
      alt={state.altText}
      width={state.image.width}
      height={state.image.height}
    />
  )

}

function handlePhoto(photo: any) {

  // console.log(photo)

  if (photo?.image?.publicUrlTransformed) {

    // console.log('cloudinaryyyyy');

    return {
      id: photo.id,
      altText: photo.altText,
      image: {
        url: photo.image.publicUrlTransformed,
        width: 300,
        height: 300,
      },
    }
  }

  if(photo) {
    return {
      altText: 'default image',
      image: {
        url: photo,
        width: 300,
        height: 300,
      }
    }
  }

  if (!photo) {
    return {
      altText: 'no product image',
      image: {
        url: `/assets/private/placeholder.png`,
        width: 300,
        height: 300,
      }
    }
  }


  return photo
}

// ? should i create a dynamic sized container here?
// picture{
//   width: 300px; /* Adjust the width of the container as per your requirement */
//   height: 300px; /* Adjust the height of the container as per your requirement */
//   border: 1px solid black; /* Optional: Add border for visualization */
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   overflow: hidden;

//   img{
//     max-width: 100%;
//     max-height: 100%;
//     object-fit: contain;
//   }
// }