#!/bin/bash
cd frontend
npm install
npm run build

cd ..
cd backend
./mvnw clean
./mvnw package

cd ..
docker-compose up --build --force-recreate