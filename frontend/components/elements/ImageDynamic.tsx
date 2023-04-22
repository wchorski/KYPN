import Image from "next/image";
import { useState } from "react";


export function ImageDynamic(photoIn: any) {

  const [state, setState] = useState<any>(handlePhoto(photoIn))

  return (
    <Image
      src={state.image.url}
      alt={state.altText}
      width={state.image.width}
      height={state.image.height}
    />
  )

}

function handlePhoto(photoIn: any) {

  // todo why is this doubled?
  const photo = photoIn.photoIn


  console.log(photo);

  console.log(photo?.image?.publicUrlTransformed);

  if (photo?.image?.publicUrlTransformed) {

    console.log('cloudinaryyyyy');

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

  if (!photo?.image) {
    return {
      altText: 'no product image',
      image: {
        url: `/assets/product-placeholder.png`,
        width: 300,
        height: 300,
      }
    }
  }


  return photo
}
