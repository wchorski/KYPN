
export function handlePhoto(photo:any){
  if(!photo){
    return {
      image: {
        url: `/cf-default.png`,
        altText: 'no product image',
        width: 300,
        height: 300,
      }
    }
  }
  // ? couldn't figure out this obj merge so i just fixed possible error in the backend schema
  // if(!photo.image.altText){
  //   const newPhoto = { image: { altText: 'no product image' }}
  //   const mergedPhoto = {...photo, ...newPhoto}
  //   return mergedPhoto
  // }
    
  return photo
}