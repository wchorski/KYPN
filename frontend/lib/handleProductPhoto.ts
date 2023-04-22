
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

  // console.log({ photo });

  if (photo.publicUrlTransformed) {
    return {
      id: photo.id,
      altText: photo.altText,
      image: {
        url: photo.publicUrlTransformed
      },
      width: 300,
      height: 300,
    }
  }

  if (!photo.image) newPhoto = { ...photo, image: defImg, altText: 'no product image' }

  return newPhoto
}
