# Dipalza WEB

contiene el proyecto web del proyecto DIPALZA

## Instalando *electron*

    npm install electron --save-dev

## Modificando el archivo *package.json*

Agregar este contenido en ***scripts***

    "electron": "electron .", // <-- add this to run electron 
    "electron-build": "ng build --prod && electron ." // <-- add 

## Ejecutando electron build

    npm run electron-build

## Instalando el empaquetador

    npm install electron-packager -g
    npm install electron-packager --save-dev

## Construyendo ejecutable Windows

    electron-packager . --platform=win32 --no-prune --ignore=/node_modules --ignore=/e2e --ignore=/src

## Construyendo ejecutable MaxOS

    electron-packager . --platform=darwin  --no-prune --ignore=/node_modules --ignore=/e2e --ignore=/src
