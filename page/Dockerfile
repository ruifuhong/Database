FROM node:18-alpine

WORKDIR /usr/src

COPY package.json .
COPY package-lock.json .
RUN npm install
RUN npm install -g nodemon 

CMD ["npm", "start"]