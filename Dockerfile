# syntax=docker/dockerfile:1

FROM mcr.microsoft.com/playwright:v1.33.0-jammy

WORKDIR /tourradar-tests-app

COPY package*.json ./
RUN npm i

COPY . .

CMD npx playwright test