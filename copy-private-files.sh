#! /bin/bash

echo "--- copying private files ---"

# # single files
mkdir -p ./private/backend/seed && cp ./backend/seed/seed_data.ts $_
mkdir -p ./private/frontend/components/menus && cp ./frontend/components/menus/Nav.tsx $_
mkdir -p ./private/frontend/components/menus && cp ./frontend/components/menus/Header.tsx $_
mkdir -p ./private/frontend/components/menus && cp ./frontend/components/menus/Footer.tsx $_
mkdir -p ./private/frontend/components/elements && cp ./frontend/components/elements/Layouts.tsx $_
mkdir -p ./private/frontend/styles && cp ./frontend/styles/GlobalThemeStyle.styled.js $_
mkdir -p ./private/frontend/pages && cp ./frontend/pages/home.tsx $_
mkdir -p ./private/frontend && cp ./frontend/.env.local $_
mkdir -p ./private/frontend && cp ./frontend/.env $_
mkdir -p ./private/frontend/public && cp ./frontend/public/robots.txt $_
mkdir -p ./private/frontend/public && cp ./frontend/public/marker.svg $_
mkdir -p ./private/frontend/public && cp ./frontend/public/favicon.ico $_
mkdir -p ./private/frontend/styles && cp ./frontend/styles/fonts.ts $_
mkdir -p ./private/backend && cp ./backend/.env $_

# # directories
mkdir -p ./private/frontend/components && cp -R ./frontend/components/private $_
mkdir -p ./private/frontend/styles && cp -R ./frontend/styles/private  $_
mkdir -p ./private/frontend/public/assets && cp -R ./frontend/public/assets/private  $_
echo "--- copying complete ---"