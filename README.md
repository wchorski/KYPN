> [!note] This is a scaled down version that only includes Keystone + Next + Next-Auth + nodemailer

# KeystoneJS CMS, NextJS

A extended example of an integrated KeystoneJS CMS in a NextJS App Directory, [example](https://github.com/keystonejs/keystone/tree/main/examples/framework-nextjs-app-directory). Self hostable with Docker

## 🔑 Features

<details>
<summary>view</summary>

### Analytics

Site analytics are set up to use an externally hosted [Umami](https://umami.is/) app. There are plans to add in admin dashboard analytics that insite user count, sales, and engagement data.

### Calendar

Events and Bookings can auto populate a connected Google Calendar.

### Authentication

[NextAuth](https://next-auth.js.org/) handles authentication which provides

- credentials login (local db) 
  - Password Reset (email verificiation)
- Social Logins (OAuth)

### Permissions & Roles

Roles are uniquly setup per instance. Each role can be customized by the *end user* with granular permission checkboxes setup in  `/src/keystone/schemas/permissions.ts`.

Developers can sculp more complex logic with `/src/keystone/access.ts`

> There is an initial db seed of **Admin**, **Editor**, **Client** Roles. These names and permissions can be customized to your project.
> </details>

## Developer Environment

Webdev starter guide
<details>
<summary>view</summary>

### Init

There are a few assets & components that you must create to give complete control over unique web parts such as

- logo
- nav menu
- header / footer

Here is a list of files you'll need to provide (there are some `*.ini` files that will help you gest started)

- create site unique assets for your brand 
  - `public/assets/logo.svg`
  - `public/assets/logo.png`
  - `public/assets/placeholder.png`
  - `public/favicon.ico`
- copy these files 
  - `cp src/ini/layout.ini.tsx src/app/layout.tsx`
  - `cp src/ini/Footer.ini.tsx src/components/private/Footer.tsx`
  - `cp src/ini/Nav.init.tsx src/components/private/Nav.tsx`
  - `cp src/ini/MainNavList.init.tsx src/components/private/MainNavList.tsx`
  - `cp src/ini/vars.ini.css src/styles/vars.css`
  - `cp src/ini/seed_data.ini.ts src/keystone/seed/seed_data.ts`.
  - `cp .env.ini .env`

> [!tip] Private Folders
> there are a few `private` folders here dedicated to your unique components and assets that won't be pushed to this codebase repo

> \![warning] Code Editor
> because we are ignoring these files, your code editor may not *see* these files when attempting to search/open. You will need to manually dig through to the `private` folder.

As a webdev, if you would like to create custom pages (that override any page created in Keystone) use the `src/app/(private)` directory. Example page ideas that you could apply to your project include.

- `src/app/(private)/home/page.tsx`
- `src/app/(private)/admin/page.tsx`

### CSS Module Styles
styling is done by a mix of global styles and css modules. that are imported into each component with intellisens. This is done by the package `typescript-plugin-css-modules`. You must set your code editor's typescript to **Use Workspace Version**. I am moving away from sass as modern CSS has all the features I need. 

### VSCode Snippits

edit `typescriptreact.json` file

<details>

<summary>Typescript Page Snippit</summary>

```json
  "Typescript React Page With Import Server Comp": {
    "prefix": [ "page-tsx", "fpi", "import-react-functional-component"],
    "body": [
      "import { envs } from '@/envs'",
      "import { nextAuthOptions } from '@/session'",
      "import {",
      "\tlayout_site,",
      "\tpage_content,",
      "\tpage_layout,",
      "\t} from '@styles/layout.module.css'",
      "import { getServerSession } from 'next-auth'",
      "",
      "type Props = {",
      "\tsearchParams:{q:string}",
      "\tparams:{id:string}",
      "}",
      "",
      "const page = 1",
      "const perPage = envs.PERPAGE",
      "export default async function $0Page ({ params, searchParams }:Props) {",
      "\tconst session = await getServerSession(nextAuthOptions)",
      "\t// const { data, error } = await fetch()",
      "\t// if (error) return <ErrorPage error={error} ><p>data fetch error </p></ErrorPage>",
      "\t// if (!users) return <NoDataFoundPage><p>No users found</p></NoDataFoundPage>",
      "",
      "\treturn (",
      "\t\t<main className={[page_layout].join(' ')}>",
      "\t\t\t<header className={layout_site}>",
      "\t\t\t\t<h1>$0Page</h1>",
      "\t\t\t</header>",
      "\t\t\t<div className={[page_content, layout_site].join(' ')}>",
      "\t\t\t\t<p>content</p>",
      "\t\t\t</div>",
      "\t\t</main>",
      "\t)",
      "}",
  
    ],
    "description": "A React functional Page with Typescript types for props."
  },
```

</details>

### Authentication

uses [Next-Auth](https://next-auth.js.org/) to authenticate session. Check KeystoneJS [example](https://github.com/keystonejs/keystone/tree/main/examples/custom-session-next-auth) for a more basic integration

set your `NEXTAUTH_SECRET` env with `openssl rand -base64 32`

| Provider | setup url                                       |
|----------|-------------------------------------------------|
| Github   | https://github.com/settings/developers          |
| Google   | https://console.cloud.google.com/apis/dashboard |

### Email

Right now, I'm just using gmail's SMTP. Should be good for low traffic order confirmation & password reset. Once I integrate running mail campaigns I'll need a better solution.

https://myaccount.google.com/security

#### Mail Templating

[React Email](https://react.email/)

### Ecommerce (Stripe)

using stripe CLI have it listen to this webhook
https://stripe.com/docs/webhooks/quickstart

```sh
stripe listen --forward-to http://localhost:3000/api/checkout/webhook
```

### Database

Assuming you know how to setup a [Postgres](https://www.postgresql.org/) database. Endpoint configured in `.env` file.

#### Seed Data

During development, if you'd like to deploy your `Pages`, `Products`, `Roles` during production, save them to `seed_data.ts`.

> [!info] Document
> any field using the rich text input type (usually named `content`) will query with an extra nested `document` key. I account for this in my `seedDatabase.ts` to make it easier to copy paste without having to remove the `document` key.

example query from apollo playground

```json
{
  content: { 
    document: [
      {
        type: "paragraph",
        children: [
          {
            text: "Learn about the amazing health benefits of various types of berries, including blueberries, strawberries, and raspberries."
          }
        ]
      }
    ],
  }
}
```

Remove the `document` if you plan on doing any direct API access. (this is not necessary in my `seedDatabase.ts` logic.)

```json
{
  content: [
      {
        type: "paragraph",
        children: [
          {
            text: "Learn about the amazing health benefits of various types of berries, including blueberries, strawberries, and raspberries."
          }
        ]
      }
    ],
}
```

#### ⚙️ Run Local Web Server

1. `yarn ks:dev` (always run first if running both servers)
2. `yarn n:dev`

> [!warning] changes made to the keystone config / schema / etc must stop and restart both services in this order or you'll recieve `[Error: EPERM: operation not permitted, unlink...` for things like

> [!error] any file imported inside the `/src/keystone` directory must be an absolute value. Typescript likes to import via `@...` and that will not work for backend imports. example: `import { envs } from '../../../envs'` and not `import { envs } from '@/envs';`

## Rules & Permissions

any changes to **access** **filters** **operations** or **permissions** will not take effect in the NextJs app until the server is reloaded. Luckily the **Keystone** app will hot reload with these changes

> 1. next `n:dev`

</details>

## 🏭 Production

<details>
<summary> config </summary>

- Keystone backend: **MAKE SURE DEV ENVIRONMENT IS GOOD 2 GO BEFORE PRODUCTION**. The Prisma types are auto generated and can become unsynced, do not make little tweaks in between dev and prod environments
- **self hosting** isn't strait forward. Here is my work around 
  - create a seperate `docker container` that runs `postgres`
  - run your dev environment to create the tables and edit the schemas
  - now you can `build` and `run` your app within a `docker container` </details>

### Database Migrations

When initializing a fresh database or returning to development you may add/remove fields to the database schema. You must run `yarn migrate` to generate a new `/migrations/NAME/migration.sql` file. Name the migration as if it was a git commit. These files are needed when upgrading your production build.
</details>

## TODO

<details>
<summary>view</summary>

- [ ] WHY IS NEXTJS terminal constantly logging `GET /_next/static/chunks/... 404`??? This i need to do before moving back to main branch
- [ ] make cute hover/click animation on powered by `www.tawtaw.site` link
- [ ] get rid of all `BlockLayout` files in favor of `Grid` or `Flex`
- [ ] update all `.ini` files
- [ ] fix all error and nodata page fallbacks
- [x] Post share modem w copy link (id)
- [ ] copy all data to json format and build to `cutefruit` live demo
- [x] page with side bar and site side bar (will use @container query)
- [x] all blocks tested
- [x] page layout that isn't complicated https://codepen.io/kevinpowell/pen/ExrZrrw?editors=1100
- [x] look into https://smolcss.dev/ for inspo

---

- [ ] appointment schedualer https://cal.com/
- [ ] document signing https://www.docuseal.co/
- [ ] built in calendar for admin dash
- [ ] create a special admin input search for Users & Events that hot swaps with main search at top
- [x] transition as much Styled Components to CSS Modules
- [ ] screen shots / recordings
  - [ ] 16 / 10 (1200 x 750) - laptop
  - [ ] ? / ? - phone
  - [ ] Events
  - [ ] Bookings
  - [ ] Products (checkout)
- [ ] use grid-template-areas to make a better PricingTable component
- [ ] which components are site specific, add them to .ignore
  - [ ] `Hero.tsx`
  - [ ] `Nav.tsx`
  - [ ] `layout.tsx`
- [ ] add option for multi email brokers (other than gmail)
- [ ] global toast notifcations with Context Provider
- [ ] Error404 on all page route types
  - [x] posts
  - [x] pages
  - [ ] bookings
  - [ ] bookings
- [ ] move all `*.ini` and `styles` to a seperate repo (or asset bucket) as to not crowd this repo. Maybe have certain **Themed** style folders to pick from?

### Blocks

#todo

- [ ] Gallery: better editor preview

- Announcements
  - create dynamic announcements that are private, members only, etc.

## Color pallet?

- https://realtimecolors.com/?colors=110604-fbf0ee-1b6874-ffffff-1b6874 </details>

---

## Credits

- Wes Bos [Tutorial](https://advancedreact.com/)