# KeystoneJS CMS, NextJS

A extended example of an integrated KeystoneJS CMS in a NextJS App Directory, [example](https://github.com/keystonejs/keystone/tree/main/examples/framework-nextjs-app-directory). Self hostable with Docker

## Roles

> These can be edited from the Keystone UI, but here is the initial permission layout

- Admin 
  - everything
  - CRUD any Product
  - CRUD any Role
  - CRUD any Order / OrderItem
- Editor 
  - 'author' of products
  - CRUD any product
- Client 
  - buy products
  - view their own orders
- Anyone 
  - view store items

## Init

- create site unique assets for your brand 
  - `public/assets/logo.svg`
  - `public/assets/logo.png`
  - `public/assets/placeholder.png`
  - `public/favicon.ico`
- copy these files & folders (or use `init.sh` to automate) 
  - `cp src/layout.init.tsx src/layout.tsx`
  - `cp src/components/menus/Footer.init.tsx src/components/menus/Footer.tsx`
  - `cp src/components/menus/Hero.init.tsx src/components/menus/Hero.tsx`
  - `cp src/components/menus/Nav.init.tsx src/components/menus/Nav.tsx`
  - `cp src/components/menus/MainNavList.init.tsxsrc/components/menus/MainNavList.tsx` <!-- - `cp src/styles-init src/styles` -->
  - `cp src/styles/vars.init.scss src/styles/vars.scss`
  - `cp src/styles/fonts.init.ts src/styles/fonts.ts`
  - `cp src/keystone/seed/seed_data.empty.ts src/keystone/seed/seed_data.ts`.

## Authentication

uses [Next-Auth](https://next-auth.js.org/) to authenticate session. Check KeystoneJS [example](https://github.com/keystonejs/keystone/tree/main/examples/custom-session-next-auth) for a more basic integration

set your `NEXTAUTH_SECRET` env with `openssl rand -base64 32`

| Provider | setup url |
|----------|-----------|
| Github | https://github.com/settings/developers |
| Google | https://console.cloud.google.com/apis/dashboard |

## Email

Right now, I'm just using gmail's SMTP. Should be good for low traffic order confirmation & password reset. Once I integrate running mail campaigns I'll need a better solution.

https://myaccount.google.com/security

### Mail Templating

[React Email](https://react.email/)

## Production

- Keystone backend: **MAKE SURE DEV ENVIRONMENT IS GOOD 2 GO BEFORE PRODUCTION**. The Prisma types are auto generated and can become unsynced, do not make little tweaks in between dev and prod environments
- **self hosting** isn't strait forward. Here is my work around 
  - create a seperate `docker container` that runs `postgres`
  - run your dev environment to create the tables and edit the schemas
  - now you can `build` and `run` your app within a `docker container`

## Development

> [!warning] changes made to the keystone config / schema / etc must stop and restart both services in this order or you'll recieve `[Error: EPERM: operation not permitted, unlink...` for things like

> [!warning] any file imported inside the `/src/keystone` directory must be an absolute value. Typescript likes to import via `@...` and that will not work for backend imports. example: `import { envs } from '../../../envs'` and not `import { envs } from '@/envs';`

- any changes to **access** **filters** or **operations**

> 1. keystone `ks:dev`
> 2. next `n:dev`

### Stripe

using stripe CLI have it listen to this webhook
https://stripe.com/docs/webhooks/quickstart

```sh
stripe listen --forward-to http://localhost:3000/api/checkout/webhook
```

During development, if you'd like to deploy your `Pages`, `Products`, `Roles` during production, save them to `seed_data.ts`

> [!info] Document
> any field using the `document` type will query with an extra nested `document` key. You can remove this

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

take out the `document` field

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

ignore list when searching code base `.next, *.test.tsx, config.js, *.graphql, *.prisma, .keystone`

## Gotchas

- the `next` depenancy is shared between keystone's auto generated backend UI and Client side frontend UI. I attempted to upgrade to `next 14` but that caused a "multi graphql dependancy" issue. I might consider decoupling these depencancies

## TODO

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

## Color pallet?

- https://realtimecolors.com/?colors=110604-fbf0ee-1b6874-ffffff-1b6874

## Credits

following along with Wes Bos Tutorial