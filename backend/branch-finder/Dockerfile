FROM node:12-alpine

FROM node:12-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production --no-optional

ENV PORT=4010

COPY . .

CMD [ "npm", "start" ]

EXPOSE 4010