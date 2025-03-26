
type Props = {
  src:string,
  color?:string,
  height?:string,
}

export function IFrame({src, height = '800px', color = 'transparent'}:Props) {
  return (
    <iframe 
    className="layout-wide"
      title="Embedded Content" 
      name="htmlComp-iframe" 
      width="100%" height={height} 
      allowFullScreen
      data-src="" 
      // src="https://www-partyvibeonline-com.filesusr.com/html/851329_b1ab933cbadfd1fac1c38270705a1e64.html"
      src={src}
      style={{backgroundColor: color}}
    >

      </iframe>
  )
}
