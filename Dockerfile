FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

COPY wait-for-it.sh ./

VOLUME [ "/usr/src/app" ]

RUN ["chmod", "+x", "/usr/src/app/wait-for-it.sh"]

CMD [ "npm", "start" ]