#! /bin/bash

echo "--- pasting init mock files ---"
mkdir -p ./backend/seed && cp ./backend/seed/seed_data.init.ts ./backend/seed/seed_data.ts
mkdir -p ./frontend/components/menus && cp ./frontend/components/menus/Nav.slim.tsx ./frontend/components/menus/Nav.tsx 
mkdir -p ./frontend/components/menus && cp ./frontend/components/menus/Header.init.tsx ./frontend/components/menus/Header.tsx
mkdir -p ./frontend/components/menus && cp ./frontend/components/menus/Footer.init.tsx ./frontend/components/menus/Footer.tsx
mkdir -p ./frontend/components/elements && cp ./frontend/components/elements/Layouts.init.tsx ./frontend/components/elements/Layouts.tsx
mkdir -p ./frontend/styles && cp ./frontend/styles/GlobalThemeStyle.styled.init.js ./frontend/styles/GlobalThemeStyle.styled.js
# mkdir -p ./frontend/pages && cp ./frontend/pages/home.init.tsx ./frontend/pages/home.tsx
mkdir -p ./frontend && cp ./frontend/.env.example ./frontend/.env.local
# mkdir -p ./frontend && cp ./private/frontend/.env $_
mkdir -p ./frontend/public && cp ./frontend/public/robots.init.txt ./frontend/public/robots.txt
mkdir -p ./frontend/public && cp ./frontend/public/favicon.init.ico ./frontend/public/favicon.ico
mkdir -p ./frontend/public && cp ./frontend/public/marker.init.svg ./frontend/public/marker.svg
mkdir -p ./frontend/styles && cp ./frontend/styles/fonts.init.ts ./frontend/styles/fonts.ts
mkdir -p ./backend && cp ./backend/.env.example ./backend/.env

# # directories
# mkdir -p ./frontend/components && cp -R ./private/frontend/components/private $_
# mkdir -p ./frontend/styles && cp -R ./private/frontend/styles/private  $_
echo "--- pasting complete ---"