FROM node:18

WORKDIR /usr/src/app

ARG NPM_TOKEN
RUN echo "//npm.pkg.github.com/:_authToken=${NPM_TOKEN}" > .npmrc
RUN echo "@ls1intum:registry=https://npm.pkg.github.com" >> .npmrc

COPY package.json ./

RUN npm i

COPY . ./
RUN npm run build

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
