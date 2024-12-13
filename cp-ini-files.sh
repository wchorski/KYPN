# #!/bin/bash
# cp "./public/favicon.ico" "./src/ini/favicon.ico"
# cp "./public/assets/placeholder.png" "./src/ini/placeholder.png"
## Next Components
cp "./src/app/layout.tsx" "./src/ini/layout.ini.tsx"
cp "./src/components/private/Footer.tsx" "./src/ini/Footer.ini.tsx"
cp "./src/components/private/Nav.tsx" "./src/ini/Nav.ini.tsx"
cp "./src/components/private/MainNavList.tsx" "./src/ini/MainNavList.ini.tsx"
cp "./src/styles/vars.css" "./src/ini/vars.ini.css"

## keystone
cp "src/keystone/seed/seed_data.ts" "src/ini/seed_data.ini.ts"

## Global don't forget to update .env file if any changes
# cp ".env" ".env.dev"