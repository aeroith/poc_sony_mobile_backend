FROM node:carbon
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install nodemon -g
COPY . .
EXPOSE 1337
CMD [ "npm", "start" ]