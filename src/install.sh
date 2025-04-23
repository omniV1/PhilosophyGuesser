#!/bin/bash

# Install root dependencies
npm install

# Install client dependencies
cd client
npm install @types/react @types/react-dom @types/node
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
npm install @reduxjs/toolkit react-redux @types/react-redux
npm install react-router-dom @types/react-router-dom
npm install axios @types/axios
npm install mapbox-gl @types/mapbox-gl
npm install vite @vitejs/plugin-react typescript @types/node
npm install @testing-library/react @testing-library/jest-dom vitest
cd ..

# Install server dependencies
cd server
npm install express cors dotenv bcryptjs jsonwebtoken passport passport-jwt passport-local prisma joi winston
npm install @types/express @types/cors @types/node @types/bcryptjs @types/jsonwebtoken @types/passport @types/passport-jwt @types/passport-local @types/jest
npm install --save-dev typescript ts-node-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin jest ts-jest supertest @types/supertest
cd ..

# Initialize Prisma
cd server
npx prisma generate
cd .. 