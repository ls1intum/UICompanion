FROM node:18

WORKDIR /app

COPY package.json .

RUN npm i
RUN npm run build

COPY . .

EXPOSE 3001

CMD npm start