FROM node:10

WORKDIR /usr/src/Bear-302CEM-Course-Work-Back-End

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
