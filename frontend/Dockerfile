# FROM node:12.22.1-alpine3.11 as dependencies
# USER node
# WORKDIR /app
# ENV PATH /app/node_modules/.bin:$PATH
# COPY --chown=node:node package*.json ./
# RUN npm ci --only=production --no-optional

# FROM dependencies
# RUN npm install react-scripts -g --silent
# COPY . .
# CMD ["npm", "start"]
# EXPOSE 3000


FROM node:12.22.1-alpine3.11 AS build
USER node
WORKDIR /app
COPY --chown=node:node package*.json ./
RUN npm ci --only=production --no-optional
COPY public ./public
COPY src ./src
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html