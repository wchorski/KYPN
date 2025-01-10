import { envs } from '@/envs';
import {QRCodeSVG} from 'qrcode.react';

type Props = {
  link:string,
}

export  function QRCode({link}:Props) {

  const fullURL = envs.FRONTEND_URL + link
  return (
    <QRCodeSVG value={fullURL} />
  )
}
