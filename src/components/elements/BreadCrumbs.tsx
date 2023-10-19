'use client'
import Link from "next/link";
import { useRouter, useSelectedLayoutSegment, usePathname } from "next/navigation";
import styles from '@styles/menus/breadcrumbs.module.scss'

export function BreadCrumbs() {
  
  const path = usePathname()

  function generateBreadcrumbs() {
    // Remove any query parameters, as those aren't included in breadcrumbs
    const asPathWithoutQuery = path.split("?")[0];

    // Break down the path between "/"s, removing empty entities
    // Ex:"/my/nested/path" --> ["my", "nested", "path"]
    
    const asPathNestedRoutes = asPathWithoutQuery.split("/")
                                .filter(v => v.length > 0);
    // console.log('asPathNestedRoutes, ', asPathNestedRoutes);
    
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

  // // Call the function to generate the breadcrumbs list
  const breadcrumbs = generateBreadcrumbs();

  return (
    <ul aria-label="breadcrumb" className={styles.list} >
      {breadcrumbs.map((crumb, idx) => (
        <li key={idx}>
          <Crumb {...crumb} last={idx === breadcrumbs.length - 1} />
        </li>
      ))}
    </ul>
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
    return <span className={styles.crumb}>{label}</span>
  }

  // All other crumbs will be rendered as links that can be visited 
  return (
    <span className={styles.crumb}>
      <Link color="inherit" href={href}>
        {label}
      </Link>
    </span>
  );
}

// const StyledCrumbList = styled.ul`
//   padding: 0;
//   margin: 0;
//   list-style: none;
//   /* opacity: .6; */
//   filter: contrast(0.3);
//   transition: opacity .3s;
//   font-size: 1rem;
//   display: flex;

//   &:hover, &:focus {
//     opacity: 1;
//   }
// `

// const StyledCrumb = styled.span`

//   &::before{
//     content: ' / ';
//     color: var(--c-desaturated);
//   }
// `