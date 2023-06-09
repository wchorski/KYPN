# KeystoneJS CMS, NextJS

following along with Wes Bos Tutorial

> [!warn] upgrading is not strait forward
> I wanted to use Keystone 6 & NextJS 13 so I hobble together code from an [official example](https://github.com/keystonejs/keystone/tree/main/examples/nextjs-keystone-two-servers) with this code

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
  - `/frontend/public/assets/private/logo.svg`
  - `/frontend/public/assets/private/logo.png`
  - `/frontend/public/assets/private/placeholder.png`
  - `/frontend/public/favicon.ico`

- copy these files
  - `/frontend/components/elements/Layouts.init.tsx` -> `/frontend/components/elements/Layouts.tsx`
  - `/frontend/styles/GlobalThemeStyle.styled.init.js` -> `/frontend/styles/GlobalThemeStyle.styled.js`
  - `/backend/seed/seed_data.init.ts` -> `/backend/seed/seed_data.ts`


## Production
- Keystone backend: **MAKE SURE DEV ENVIRONMENT IS GOOD 2 GO BEFORE PRODUCTION**. The Prisma types are auto generated and can become unsynced, do not make little tweaks in between dev and prod environments 
- **self hosting** isn't strait forward. Here is my work around
  - create a seperate `docker container` that runs `postgres`
  - run your dev environment to create the tables and edit the schemas
  - now you can `build` and `run` your app within a `docker container`

## Development
- don't forget to run and save these queries to the `seed_data.ts` 
  - `Query.Pages`
  - `Query.Services`
  - `Query.Roles`
  - `Query.Products`


## TODO
- [ ] create a special admin input search for Users & Events that hot swaps with main search at top

## Color pallet? 
- https://realtimecolors.com/?colors=110604-fbf0ee-1b6874-ffffff-1b6874