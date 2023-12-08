#!/bin/bash

echo "--- intialize project with starter files ---"

# # single files
cp ./src/keystone/seed/seed_data.empty.ts ./src/keystone/seed/seed_data.ts
cp ./src/styles/vars.init.scss ./src/styles/vars.scss
cp ./src/components/menus/Hero.init.tsx ./src/components/menus/Hero.tsx
cp ./src/components/menus/Footer.init.tsx ./src/components/menus/Footer.tsx
cp ./src/components/menus/MainNavList.init.tsx ./src/components/menus/MainNavList.tsx
cp ./src/components/menus/Nav.init.tsx ./src/components/menus/Nav.tsx
cp ./src/app/layout.init.tsx ./src/app/layout.tsx

