## Keystone-Next-Auth-AIO-Exammple
combines keystone CMS, Next 14, and Next Auth into one package while still retaining Keystone's Admin UI nested inside Next App

## Development 
### Seed data
`cp ./keystone/seed/extracted/seedData.json.example ./keystone/seed/extracted/seedData.json`
### Build on Local Machine
Test out a production build using the provided `package.json` scripts.

> this build NextJS as standalone app. Keystone is ran as a seperate app but can be accessed through NextJS app through `http://NEXTJS_APP/admin`

1. `pnpm tbuild` 
2. `pnpm start`

## Seed Database
1. `cp seedData.json.example seedData.json`
2. .env SEED_EXTRACT_NONE=`seed`
3. `pnpm ks:dev`
4. use `pnpm dev` to run both NextJs app and Keystone CMS in parallel

## Production
Before you build, you must create a `database migration` (unless you manualy copy your `db` files over from dev to production server). This will ensure all db tables (`Users` `Posts` `Roles` etc) are created.

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

> you may add the `--no-cache` flag at the end incase of stale build conflicts

> [!warning] Docker build does not support `sqlite` database

## CSS
In this repo I mostly rely on css modules. Make sure to set your VS Code and select **Use Workspace Version** for your typescript

The `typescript-plugin-css-modules` package allows you to import css classes like an exported js const / function.

example
```tsx
import allStyles, { bg_c_accent, bg_c_plain, bg_c_primary, bg_c_reverse_theme, bg_c_secondary, bg_c_tertiary, bg_c_transparent, outline_c_secondary, outline_c_tertiary } from "../styles/colorthemes.module.css"
```

## Enviroment 
```
node v21
```

## Issues
- [util._extend issue](https://github.com/vercel/next.js/issues/71374)