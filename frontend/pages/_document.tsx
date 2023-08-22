import Document, { DocumentContext, DocumentInitialProps } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      }
    } finally {
      sheet.seal()
    }
  }
}

// import Document, { Html, Head, Main, NextScript } from 'next/document'
// import { ServerStyleSheet } from 'styled-components'

// export default class MyDocument extends Document {

//   static async getInitialProps(ctx:any, {renderPage}: any){
//     const initialProps = await Document.getInitialProps(ctx)
//     const sheet = new ServerStyleSheet()
//     const page = renderPage((App: any) => (props: any) => sheet.collectStyles(<App {...props} /> ))
//     const styleTags = sheet.getStyleElement()
//     console.log(styleTags)
//     return { ...initialProps, ...page, styleTags}

//   }

//   render(): JSX.Element {
    
//     return (
//       <Html lang="en-CA">
//         <Head />
//         <body>
//           <Main />
//           <NextScript />
//         </body>
//       </Html>
//     )
//   }
// }
