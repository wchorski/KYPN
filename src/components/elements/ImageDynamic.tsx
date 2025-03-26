import Image from "next/image";
// todo should i do a bit of styling on img here or just let parents do it?
// import { img } from "@styles/image.module.css";

type Props = {
  photoIn: {
    url:string
    altText:string,
  }|string | null | undefined,
  className?:string,
  alt?:string,
  width?:number
  height?:number
  priority?:boolean
}
// todo idk, just gonna not use the 'optimized' version on production for now
export function ImageDynamic({ photoIn, className, alt, width = 300, height = 300, priority = false}: Props) {
  
  // console.log(photoIn);
  
  const state = handlePhoto(photoIn, alt)
  // const [state, setState] = useState<any>(handlePhoto(photoIn))


  return (
    <Image
      // src={'/assets/question.png'}
      src={state.image.url}
      alt={state.altText}
      width={width}
      height={height}
      className={className}
      priority={priority}
      //TODO how to gracefully show 'loading' image'
      // placeholder={'blur'}
      // blurDataURL={'/assets/placeholder.png'}
      // blurDataURL={state.image.url}
      
      // style={{
      //   width: '100%',
      //   height: 'auto',
      //   aspectRatio: 'auto',
      // }}
    />
  )

}

function handlePhoto(photo: any, alt?:string) {
  
  //todo set width and height smart because this is like a thumbnail size
  // https://nextjs.org/docs/pages/api-reference/components/image
  if (!photo ) {
    return {
      altText: alt || '',
      image: {
        url: `/assets/placeholder.png`,
      }
    }
  }

  if (photo?.image?.publicUrlTransformed) {

    // console.log('cloudinaryyyyy');

    return {
      id: photo.id,
      altText: photo.altText,
      image: {
        url: photo.image.publicUrlTransformed,
      },
    }
  }

  if(!photo.url && photo.altText) {
    
    return {
      altText: photo.altText,
      image: {
        url: `/assets/placeholder.png`,
      }
    }
  }

  if(photo.url && photo.altText) {
    
    return {
      altText: photo.altText,
      image: {
        url: photo.url,
      }
    }
  }

  if(photo) {
    return {
      altText: '',
      image: {
        url: photo,
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