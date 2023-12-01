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
      <a
        href="https://www.tawtaw.site"
        target="_blank"
        rel="noopener noreferrer"
      > 
        <span> {`There's a Will There's a Web.site`} </span>
      </a>
    </div>
  )
}