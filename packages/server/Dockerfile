FROM node:18

WORKDIR /usr/src/server

ARG NPM_TOKEN
RUN echo "//npm.pkg.github.com/:_authToken=${NPM_TOKEN}" > .npmrc
RUN echo "@ls1intum:registry=https://npm.pkg.github.com" >> .npmrc

COPY package.json ./

RUN npm i

COPY . .

EXPOSE 3001

CMD npm start