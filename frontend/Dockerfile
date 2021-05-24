FROM node:14.17.0-alpine3.11 AS build
USER node
WORKDIR /app
COPY --chown=node:node package*.json ./
RUN npm ci --only=production --no-optional
COPY public ./public
COPY src ./src
CMD ["npm", "run", "build"]

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
ENTRYPOINT ["nginx", "-g", "daemon off;"]