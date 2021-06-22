FROM node:alpine

RUN mkdir /app
WORKDIR /app

COPY package.json yarn.lock .eslintrc.json tsconfig.json .env ./
RUN yarn install

COPY src src

CMD npm start