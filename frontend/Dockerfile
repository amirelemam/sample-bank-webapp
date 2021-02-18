FROM node:12-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm ci --only=production --no-optional
RUN npm install react-scripts -g --silent

ENV PORT=3000

COPY . ./

CMD [ "npm", "start" ]

EXPOSE 3000