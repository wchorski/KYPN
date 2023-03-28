import React from 'react';
import Link from 'next/link';
import { fetchGraphQL, gql } from '../graphql';
import Image from 'next/image';

// type Post = {
//   id: string;
//   title: string;
//   slug: string;
//   publishDate: string | null;
//   author: {
//     name: string;
//   } | null;
// };

// function PublishDate({ publishDate }: { publishDate: Post['publishDate'] }) {
//   const formattedDate = publishDate ? new Date(publishDate).toLocaleDateString() : null;

//   if (!formattedDate) {
//     return null;
//   }
//   return (
//     <span>
//       <em> · Published on {formattedDate}</em>
//     </span>
//   );
// }

// function AuthorInfo({ author }: { author: Post['author'] }) {
//   if (!author?.name) {
//     return null;
//   }

//   return (
//     <span>
//       <em> · by {author?.name}</em>
//     </span>
//   );
// }

export default function StorePage({ products, error }: { products: any; error?: Error }) {
  if (error) {
    return (
      <>
        <h1>Something went wrong</h1>
        <pre>{error.message}</pre>
      </>
    );
  }

  return (
    <main>
      <h1>Store Page</h1>

      <ul>
        {products.map((prod: any) => {
          return (
            <li key={prod.id}>
              <h3>{prod.name}</h3>
              <p>{prod.description}</p>
              <span>{prod.price}</span>
              {prod.photo && (
                <Image 
                  src={prod.photo?.image?.url} 
                  alt={prod.photo?.altText}
                  width={prod.photo?.image?.width}
                  height={prod.photo?.image?.height}
                />
              )}
              {!prod.photo && (
                <p>No image</p>
              )}

            </li>
          );
        })}
      </ul>
    </main>
  );
}

export async function getStaticProps() {
  try {
    const data = await fetchGraphQL(gql`
      query Products {
        products {
          id
          description
          name
          photo {
            image {
              url
              width
              height
              id
            }
            id
            altText
          }
          price
          status
        }
      }
    `);
    

    const products = data?.products || [];
    return {
      props: {
        products,
      },
    };
  } catch (e) {
    return {
      props: {
        posts: [],
        error: { name: (e as Error).name, message: (e as Error).message },
      },
    };
  }
}