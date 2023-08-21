import localFont from 'next/font/local'
import { Exo } from "next/font/google";

export const fontHeader = localFont({
  src: '../public/assets/fonts/Exo-VariableFont_wght.ttf',
  // display: 'swap',
  variable: '--font-header',
})

export const fontParagraph = localFont({
  src: '../public/assets/fonts/NunitoSans-VariableFont_YTLC.ttf',
  // display: 'swap',
  variable: '--font-paragraph',
})

export const fontExo = Exo({
  subsets: ['latin'],
  weight: "900",
  variable: '--font-exo',
})