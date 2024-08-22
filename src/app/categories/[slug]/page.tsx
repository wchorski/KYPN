import ErrorMessage from "@components/ErrorMessage";
import { PageTHeaderMain, PageTHeaderMainAside } from "@components/layouts/PageTemplates";
import { Category, Post, Tag } from "@ks/types";
import { envs } from "@/envs";
import { Metadata } from "next";
import { Section } from "@components/blocks/Section";
import Link from "next/link";
import fetchCategories from "@lib/fetchdata/fetchCats";
import fetchCategory from "@lib/fetchdata/fetchCategory";

type Props = {
    params:{
        name:string,
    },
    searchParams: { 
        [key: string]: string | string[] | undefined,
        slug:string | string[] | undefined,
    }
  }

export const metadata: Metadata = {
  title: `Categoires | ` + envs.SITE_TITLE,
  description: envs.SITE_DESC,
}

export default async function CategoriesByIdPage({params}:Props) {

    const { name } = params

  const { category, error } = await fetchCategory(name)

  if(error) return <ErrorMessage error={error}/>

  return <>
    <PageTHeaderMain 
      header={Header()}
      main={Main({category})}
    />

  </>
}

function Header(){

  return <>
    <Section layout={'1'}>
      <h1> Categories </h1>
    </Section>
  </>
}

type Main = {
    category:Category|undefined,
}

function Main({category}:Main) {

  if(!category) <p> no category found </p>
  
  return<>
    <Section layout='1'>
      <ul>
        {category?.posts?.map(post => (
          <li key={post.id}>
            <Link href={`/blog/${post.title}`}> {post.title} </Link>
          </li>
        ))}
      </ul>
    </Section>
  </>
}

// function Aside() {
  
//   return<>
//     <Card>
//       <h2> Categories </h2>
//       <CategoriesPool />

//     </Card>

//     <Card>
//       <h2> Tags </h2>
//       <TagsPool />
//     </Card>
//   </>
// }
