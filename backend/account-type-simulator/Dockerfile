FROM node:12-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production --no-optional

ENV PORT=4000

COPY . .

EXPOSE 4000

CMD [ "npm", "start" ]