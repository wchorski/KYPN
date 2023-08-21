import localFont from 'next/font/local'

export const fontHeader = localFont({
  src: '../public/assets/fonts/Exo-VariableFont_wght.ttf',
  display: 'swap',
  variable: '--font-header',
})

export const fontParagraph = localFont({
  src: '../public/assets/fonts/NunitoSans-VariableFont_YTLC,opsz,wdth,wght.ttf',
  display: 'swap',
  variable: '--font-paragraph',
})