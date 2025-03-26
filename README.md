## Keystone-Next-Auth-AIO-Exammple

combines keystone CMS, Next 14, and Next Auth into one package while still retaining Keystone's Admin UI.

An extended example of an integrated KeystoneJS CMS in a NextJS App Directory, [example](https://github.com/keystonejs/keystone/tree/main/examples/framework-nextjs-app-directory). Self hostable with Docker

## Features

<details>
  <summary>view</summary>

### Analytics

Site analytics are set up to use an externally hosted [Umami](https://umami.is/) app. There are plans to add in admin dashboard analytics that insite user count, sales, and engagement data.

### Calendar

Events and Bookings can auto populate a connected Google Calendar.

### Self Host

Dockerfiles and Docker Compose configs for hosting anywhere there is Docker

</details>

## Development

For those who just cloned the repo and want to customize this template or contribute back to this repo

```shell
git clone https://github.com/wchorski/KYPN.git
## Look through .env file and set to your environment needs
cp .env.example .env
pnpm i
pnpm dev

## only next app
pnpm n:dev
## only keystone cms app
pnpm ks:dev
```

<details>
  <summary>view more</summary>

#### Init Components & Pages

This repo ignores some key files to make the frontend as customizable as possible between projects.

check the `ini` folder for examples. I created a `init-files.sh` but haven't tested it. `cp-init-files.sh` is for repo devs who want to update the inital files for everyone.

#### Seed or Extract Data

```
cp ./keystone/seed/extracted/seedData.json.example ./keystone/seed/extracted/seedData.json
```

set `SEED_EXTRACT_NONE` to `extract` and run `pnpm ks:dev` to save _most_ data to a `json` file `seedData.json`

### CMS App

> [!warning] changes made to the keystone config / schema / etc must stop and restart both services in this order or you'll recieve `[Error: EPERM: operation not permitted, unlink...` for things like

> [!warning] any file imported inside the `/src/keystone` directory must be an absolute value. Typescript likes to import via `@...` and that will not work for backend imports. example: `import { envs } from '../../../envs'` and not `import { envs } from '@/envs';`

### Authentication

uses [Next-Auth](https://next-auth.js.org/) to authenticate session. Check KeystoneJS [example](https://github.com/keystonejs/keystone/tree/main/examples/custom-session-next-auth) for a more basic integration

set your `NEXTAUTH_SECRET` env with `openssl rand -base64 32`

| Provider | setup url                                       |
| -------- | ----------------------------------------------- |
| Github   | https://github.com/settings/developers          |
| Google   | https://console.cloud.google.com/apis/dashboard |

### Email

Right now, I'm just using gmail's SMTP. Should be good for low traffic order confirmation & password reset. Once I integrate running mail campaigns I'll need a better solution.

https://myaccount.google.com/security

Mail Templating with [React Email](https://react.email/)

### Stripe

using stripe CLI have it listen to this webhook
https://stripe.com/docs/webhooks/quickstart

```sh
stripe listen --forward-to http://localhost:3000/api/webhooks/stripe
```

### Database Migrations

When returning to development (from production) you may add new fields to the database schema. You will need to create a migration.

```shell
pnpm migrate
```

Properly name and save the migration. This file will be written inside the `./migrations` folder

When returning to the production environment, a freshly built container will run the migration via `CMD ["npx", "keystone", "start", "--with-migrations"]`.

### CSS Styles

In this repo I rely on css modules. Make sure to set your VS Code and select **Use Workspace Version** for your typescript

The `typescript-plugin-css-modules` package allows you to import css classes like an exported js const / function.

example

```tsx
import allStyles, {
	bg_c_accent,
	bg_c_plain,
	bg_c_primary,
	bg_c_reverse_theme,
	bg_c_secondary,
	bg_c_tertiary,
	bg_c_transparent,
	outline_c_secondary,
	outline_c_tertiary,
} from "../styles/colorthemes.module.css"
```

### Build on Local Machine

Test out a production build using the provided `package.json` scripts.

> this build NextJS as standalone app. Keystone is ran as a seperate app but can be accessed through NextJS app through `http://NEXTJS_APP/admin`

1. `pnpm tbuild`
2. `pnpm start`

</details>

## Production

This template is not a clone and go repo. You must checkout out the Development drop down and initiate some files before your ready to deploy

<details>
  <summary>view more</summary>

### Database Migrations

If you've made any changes to the Keystone app, you must create a `database migration`. This will ensure all db tables (`Users` `Posts` `Roles` etc) are created.

```shell
pnpm migrate --name CUSTOM_NAME
```

### Docker Build

- `cp .env.example .env.prod` (seperate file for production)
- `cp compose.yml.example compose.yml`

```shell
docker compose build
docker compose up
```

or use the `build-deploy-containers.sh` script.

> you may add the `--no-cache` flag at the end incase of stale build conflicts

> [!warning] Docker build does not support `sqlite` database

</details>

## Enviroment
```
node v21
```

## Issues

- [util.\_extend issue](https://github.com/vercel/next.js/issues/71374)
