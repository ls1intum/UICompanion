FROM node:18

WORKDIR /usr/src/app

COPY . ./

RUN npm i
RUN npm run build

ENV NODE_ENV="production"

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
