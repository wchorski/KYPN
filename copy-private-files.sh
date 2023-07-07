#! /bin/bash

echo "--- copying private files ---"
cp ./backend/seed/seed_data.ts ./private/backend/seed/
cp ./frontend/components/menus/Nav.tsx ./private/frontend/components/menus/Nav.tsx
cp ./frontend/components/menus/Header.tsx ./private/frontend/components/menus/Header.tsx 
cp ./frontend/components/menus/Footer.tsx ./private/frontend/components/menus/Footer.tsx 
cp ./frontend/components/elements/Layouts.tsx ./private/frontend/components/elements/Layouts.tsx
cp -a ./frontend/components/private ./private/frontend/components/
cp -a ./frontend/styles/private ./private/frontend/styles/
cp ./frontend/styles/GlobalThemeStyle.styled.js ./private/frontend/styles/GlobalThemeStyle.styled.js
cp ./frontend/pages/home.tsx ./private/frontend/pages/home.tsx 
cp ./frontend/.env.local ./private/frontend/.env.local
cp ./frontend/.env ./private/frontend/.env 
cp ./backend/.env ./private/backend/.env 
echo "--- copying complete ---"