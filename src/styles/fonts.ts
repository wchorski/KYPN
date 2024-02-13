import localFont from 'next/font/local'
import { Exo } from "next/font/google";

export const fontHeader = localFont({
  src: '../public/assets/fonts/LuloCleanFour.otf',
  // display: 'swap',
  variable: '--font-header',
})

export const fontSub = localFont({
  src: '../public/assets/fonts/HindSiliguri-Regular.ttf',
  // display: 'swap',
  variable: '--font-sub',
})


export const fontParagraph = localFont({
  src: '../public/assets/fonts/ProximaNova-Regular.otf',
  // display: 'swap',
  variable: '--font-paragraph',
})

export const fontExoo = localFont({
  src: '../public/assets/fonts/Exo-VariableFont_wght.ttf',
  // display: 'swap',
  variable: '--font-exoo',
})

export const fontNunito = localFont({
  src: '../public/assets/fonts/NunitoSans-VariableFont_YTLC.ttf',
  // display: 'swap',
  variable: '--font-nunito',
})

export const fontExo = Exo({
  subsets: ['latin'],
  weight: "900",
  variable: '--font-exo',
})

export const fontBoogaloo = localFont({
  src: '../public/assets/fonts/Boogaloo-Regular.ttf',
  variable: '--font-Boogaloo'
})