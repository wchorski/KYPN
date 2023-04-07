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
