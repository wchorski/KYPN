import { ProductsList } from "@components/ecommerce/ProductsList";


type Props = {
  header:string,
  imageSrc?:string,
  color:string,
  colorOverlay:string,
  categories: { id:string }[]
  style?: any,
}

export function ProductListBlock({header, color, colorOverlay, imageSrc, categories,}:Props) {


  return (
    <section style={{
      backgroundColor: color,
      backgroundImage: `url(${imageSrc})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    }}>
      <div className="overlay" style={{backgroundColor: colorOverlay, padding: '1em 0 10em 0',}}>
        <div 
          className="wrapper" 
          style={{maxWidth: 'var(--w-sitemax)', marginInline: 'auto'}}
        >
          <h2 style={{textAlign: 'center', margin: '4rem'}}> 
            {header}
          </h2>
          
          <ProductsList 
            page={1} 
            products={[]}
            categoryNames={categories.flatMap(cat => cat.id)}
          />
          {/* <BlogList page={1} categories={categories}/> */}
        </div>
      </div>
    </section>
  )
}