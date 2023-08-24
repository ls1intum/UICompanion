FROM node:18

WORKDIR /usr/src/server

COPY package.json .

RUN npm i

COPY . .

EXPOSE 3001

CMD npm start