import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

export function BreadCrumbs() {
  
  const router = useRouter()
  console.log(router.asPath);

  function generateBreadcrumbs() {
    // Remove any query parameters, as those aren't included in breadcrumbs
    const asPathWithoutQuery = router.asPath.split("?")[0];

    // Break down the path between "/"s, removing empty entities
    // Ex:"/my/nested/path" --> ["my", "nested", "path"]
    const asPathNestedRoutes = asPathWithoutQuery.split("/")
                                                 .filter(v => v.length > 0);

    // Iterate over the list of nested route parts and build
    // a "crumb" object for each one.
    const crumblist = asPathNestedRoutes.map((subpath, idx) => {
      // We can get the partial nested route for the crumb
      // by joining together the path parts up to this point.
      const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
      // const label = href.split('/').filter(Boolean).pop(); // Split the string and remove empty elements
      const label = subpath; // Split the string and remove empty elements
      // The title will just be the route string for now
      const title = subpath;
      return { href, label }; 
    })

    // Add in a default "Home" crumb for the top-level
    return crumblist;
  }

  // Call the function to generate the breadcrumbs list
  const breadcrumbs = generateBreadcrumbs();

  return (
    <StyledCrumbList aria-label="breadcrumb">
      {breadcrumbs.map((crumb, idx) => (<>
        <Crumb {...crumb} key={idx} last={idx === breadcrumbs.length - 1} />
      </>))}
    </StyledCrumbList>
  )
}

type Crumb = {
  label:string,
  href:string,
  last:boolean,
}

function Crumb({ label, href, last=false }:Crumb) {
  // The last crumb is rendered as normal text since we are already on the page
  if (last) {
    return <StyledCrumb color="text.primary">{label}</StyledCrumb>
  }

  // All other crumbs will be rendered as links that can be visited 
  return (
    <StyledCrumb>
      <Link color="inherit" href={href}>
        {label}
      </Link>
    </StyledCrumb>
  );
}

const StyledCrumbList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  /* opacity: .6; */
  filter: contrast(0.3);
  transition: opacity .3s;
  font-size: 1rem;

  &:hover, &:focus {
    opacity: 1;
  }
`

const StyledCrumb = styled.span`

  &::before{
    content: ' / ';
    color: var(--c-desaturated);
  }
`