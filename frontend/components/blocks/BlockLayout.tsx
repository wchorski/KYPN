import { ReactNode } from "react"

type Props = {
  children: ReactNode,
}

export function BlockLayout({children}:Props) {

  // console.log(props);
  

  return (

    <div style={{
      display: 'grid',
      gap: '1em',
      padding: '5em 0',
      gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
    }}>

      {children}
     

    </div>
  )
}


