import { QRCodeSVG } from "qrcode.react"

type Props = {
	text: string
}

export function QRCode({ text }: Props) {
	return <QRCodeSVG value={text} />
}

// cred - chatgpt
// one day i want to gen qr codes without library

// import React from 'react'

// type QRCodeProps = {
//   text: string
//   size?: number // Optional: size of the QR code grid
// }

// export const QRCodeSVG: React.FC<QRCodeProps> = ({ text, size = 21 }) => {
//   if (!text) {
//     throw new Error('Text is required to generate a QR code')
//   }

//   // Convert input text to binary
//   const binaryData = Array.from(text).map(char => {
//     return char.charCodeAt(0).toString(2).padStart(8, '0')
//   }).join('')

//   // Generate SVG grid
//   const cellSize = 10 // Each cell is 10x10 pixels
//   const svgElements: React.ReactNode[] = []
//   let dataIndex = 0

//   for (let row = 0; row < size; row++) {
//     for (let col = 0; col < size; col++) {
//       const isFilled = binaryData[dataIndex] === '1'
//       dataIndex = (dataIndex + 1) % binaryData.length

//       if (isFilled) {
//         svgElements.push(
//           <rect
//             key={`${row}-${col}`}
//             x={col * cellSize}
//             y={row * cellSize}
//             width={cellSize}
//             height={cellSize}
//             fill="black"
//           />
//         )
//       }
//     }
//   }

//   // Return SVG as React element
//   return (
//     <div style={{background: 'white', padding: '1rem'}}>
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width={size * cellSize}
//         height={size * cellSize}
//         viewBox={`0 0 ${size * cellSize} ${size * cellSize}`}
//       >
//         {svgElements}
//       </svg>
//     </div>
//   )
// }
