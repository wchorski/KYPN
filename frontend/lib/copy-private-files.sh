#! /bin/bash

echo "--- copying private files ---"

cp ../components/menus/Nav.tsx ../private/components/menus/Nav.tsx
cp ../components/Header.tsx ../private/components/Header.tsx 
cp ../components/elements/Layouts.tsx ../private/components/elements/Layouts.tsx
cp -a ../components/private ../private/components/
cp -a ../styles/private ../private/styles/private
cp ../styles/GlobalThemeStyle.styled.js ../private/styles/GlobalThemeStyle.styled.js
cp ../pages/home.tsx ../private/pages/home.tsx 
cp ../.env.local ../private/.env.local
echo "--- copying complete ---"