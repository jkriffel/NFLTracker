# CSCE4523-Final

- Project Contributors: Zachary Anderson, James Riffel

- This web app uses flask, a python based backend, and react, a JS framework for the frontend UI/UX. This project also expands on AWS's EC2 deployment servers, and its RDS (Relational Database Service) PaaS (Platform as a Service).

## flask-server

- ## server.py
- ## venv
  - ## scripts

## client

- src

  - components

    - These are "plug-in-play" tsx files that include things such as Spinners, Banners, Popups

  - routes

    - Routes are each page that the user sees.

  - app.tsx

    - This is where the react-router is created, and how to define new paths on the app

  - index.css
    - This project uses tailwind, but it uses this file to style every pages "theme"
  - main.tsx
    - Entry point to for react-scripts to build and start the app

- vite.config.ts
  - This is where you setup the front end proxy for the backend 'express-server'
