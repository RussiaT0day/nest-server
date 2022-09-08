FROM node:12.13-alpine

WORKRID /app

COPY package*.json ./

RUN npm install

COPY . .

COPY ./dist ./dits

CMD ["npm", "run", "start:dev"]
