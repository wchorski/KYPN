#! /bin/bash

echo "--- pasting private files ---"
cp ./private/backend/seed/seed_data.ts ./backend/seed/seed_data.ts
cp ./private/frontend/components/menus/Nav.tsx ./frontend/components/menus/Nav.tsx
cp ./private/frontend/components/menus/Header.tsx ./frontend/components/menus/Header.tsx 
cp ./private/frontend/components/menus/Footer.tsx ./frontend/components/menus/Footer.tsx 
cp ./private/frontend/components/elements/Layouts.tsx ./frontend/components/elements/Layouts.tsx
cp -a ./private/frontend/components/ ./frontend/components/private
cp -a ./private/frontend/styles/private ./frontend/styles/private
cp ./private/frontend/styles/GlobalThemeStyle.styled.js ./frontend/styles/GlobalThemeStyle.styled.js
cp ./private/frontend/pages/home.tsx ./frontend/pages/home.tsx
cp ./private/frontend/.env.local ./frontend/.env.local
cp ./private/frontend/.env ./frontend/.env
cp ./private/backend/.env ./backend/.env
echo "--- pasting complete ---"