import { gql } from "@apollo/client";
import ErrorMessage from "@components/ErrorMessage";
import { BlogListItem } from "@components/blog/BlogListItem";
import { ProductThumbnail } from "@components/ecommerce/ProductThumbnail";
import { Card } from "@components/layouts/Card";
import { PageTHeaderMainAside } from "@components/layouts/PageTemplates";
import { Section } from "@components/layouts/Section";
import { CategoriesPool } from "@components/menus/CategoriesPool";
import { QueryLoading } from "@components/menus/QueryLoading";
import { TagsPool } from "@components/menus/TagsPool";
import { getClient } from "@lib/gqlClient";
import { Category } from "@lib/types";
import stylesBlog from '@styles/blog/Blog.module.scss'
import stylesProduct from '@styles/ecommerce/Product.module.scss'


export const revalidate = 5;

type Props = {
  params:{
    name:string | string[] | undefined,
  },
  template:string,
}


export default async function BlogPageBySlug({ params }:Props) {

  const { name } = params
  
  const client = getClient()
  const { data, error, loading } = await client.query({query, 
    variables: {
      where: {
        name: name
      }
    }
  })

  if (loading) return <QueryLoading />
  if (error) return <ErrorMessage error={error} />

  
  const {category}:{category:Category} = data


  return ( 
    <PageTHeaderMainAside 
      header={Header(String(name))}
      main={Main(category)}
      aside={Aside()}
    />
  )
}


function Header(name:string){

  return (
    <header>
      <h1> Archive: {name}</h1>
      <p> browse articles categorized by <strong>{name}</strong> </p>
    </header>
  )
}

function Main(category:Category){


  return <>
  
    <Section 
      layout='1'
    >

      <h2>Posts: </h2>
      <ul className={stylesBlog.blog}>
        {category.posts?.map(post => (
          <li key={post.id}>
            <BlogListItem {...post}/>
          </li>
        ))} 

        {category.posts.length === 0  && <p> no posts </p>}
      </ul>
  
    </Section>

    <Section layout="1">

      <h2> Products: </h2>

      <ul className={stylesProduct.product}>
      {category.products?.map(prod => (
        <li key={prod.id}>
          <ProductThumbnail {...prod}/>
        </li>
      ))}
          
        {category.products.length === 0  && <p> no products </p>}
      </ul>
    </Section>

  </>
}

function Aside(){

  return <>
    <Card>
      <h3> Categories </h3>
      <CategoriesPool />
    </Card>
    <Card>
      <h3> Tags </h3>
      <TagsPool />
    </Card>
  </>
}

const query = gql`
  query Category($where: CategoryWhereUniqueInput!) {
    category(where: $where) {
      id
      posts {
        id
        dateCreated
        excerpt
        featured_image
        featured_video
        status
        title
        author {
          id
          name
        }
        pinned
      }
      products{
        id
        excerpt
        name
        price
        status
        image
      }
    }
  }
`