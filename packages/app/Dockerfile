FROM node:18

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm i

ENV NODE_ENV="production"

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
