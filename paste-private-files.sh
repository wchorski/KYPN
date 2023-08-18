#! /bin/bash

echo "--- pasting private files ---"
mkdir -p ./backend/seed && cp ./private/backend/seed/seed_data.ts $_
mkdir -p ./frontend/components/menus && cp ./private/frontend/components/menus/Nav.tsx $_
mkdir -p ./frontend/components/menus && cp ./private/frontend/components/menus/Header.tsx $_
mkdir -p ./frontend/components/menus && cp ./private/frontend/components/menus/Footer.tsx $_
mkdir -p ./frontend/components/elements && cp ./private/frontend/components/elements/Layouts.tsx $_
mkdir -p ./frontend/styles && cp ./private/frontend/styles/GlobalThemeStyle.styled.js $_
mkdir -p ./frontend/pages && cp ./private/frontend/pages/home.tsx $_
mkdir -p ./frontend && cp ./private/frontend/.env.local $_
mkdir -p ./frontend && cp ./private/frontend/.env $_
mkdir -p ./private/frontend && cp ./frontend/robots.txt $_
mkdir -p ./backend && cp ./private/backend/.env $_

# # directories
mkdir -p ./frontend/components && cp -R ./private/frontend/components/private $_
mkdir -p ./frontend/styles && cp -R ./private/frontend/styles/private  $_
echo "--- pasting complete ---"