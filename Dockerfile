FROM node:latest

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD [ "nodemon", "index.js" ]
