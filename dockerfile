FROM node:21 AS build-stage

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY . .

RUN yarn

EXPOSE 3001

CMD [ "yarn", "run", "start" ]

