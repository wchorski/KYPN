type Props = {
  prop?:string
}

export function TawTawPowered ({ prop }:Props) {
  return (
    <div 
      style={{
        textAlign: 'center',
      }}
    >
      <span> Powered by </span>
      <a
        href="https://www.tawtaw.site"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: 'rgb(140, 192, 167)'
        }}
      > 
        <span> {`There's a Will There's a Web.site`} </span>
      </a>
    </div>
  )
}