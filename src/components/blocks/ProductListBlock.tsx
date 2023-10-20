import { gql } from "graphql-request";
import { BlogList } from "../blog/BlogList"
import { ProductsList } from "@components/ecommerce/ProductsList";
import { ProductThumbnail } from "../ecommerce/ProductThumbnail";
import styles from '@styles/ecommerce/Product.module.scss'


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
          style={{maxWidth: 'var(--maxWidth)', marginInline: 'auto'}}
        >
          <h2 style={{textAlign: 'center', margin: '4rem'}}> 
            {header}
          </h2>
          
          <ProductsList page={1} categories={categories}/>
          {/* <BlogList page={1} categories={categories}/> */}
        </div>
      </div>
    </section>
  )
}