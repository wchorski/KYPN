
export function handlePhoto(photo: any) {

  let newPhoto = photo

  const defImg = {
    url: `/cf-default.png`,
    width: 300,
    height: 300,
  }

  if (!photo) {
    return {
      altText: 'no product image',
      image: defImg
    }
  }

  if (!photo.image) newPhoto = { ...photo, image: defImg, altText: 'no product image' }

  return newPhoto
}