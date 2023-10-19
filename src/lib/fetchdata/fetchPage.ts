import { keystoneContext } from "@ks/context";

export default async function fetchPage(slug:string, session:any){

  try {

    const page = await keystoneContext.withSession(session).query.Page.findOne({
      where: { slug: slug },
      query: `
        id
        slug
        title
        template
        dateCreated
        dateModified
        tags {
          name
        }
        categories {
          name
        }
        status
        author{
          id
          name
        }
        content {
          document(hydrateRelationships: true)
        }
      `
    });

    return { page }
    
  } catch (error) {
    console.log('fetch Page: ', error)
    return { error }
  }
}
