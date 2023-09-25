import {QRCodeSVG} from 'qrcode.react';

type Props = {
  link:string,
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URI

export  function QRCode({link}:Props) {

  const fullURL = SITE_URL + link
  return (
    <QRCodeSVG value={fullURL} />
  )
}
