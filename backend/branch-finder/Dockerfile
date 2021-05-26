FROM node:14.17.0-alpine3.11 AS dependencies
USER node
WORKDIR /app
COPY --chown=node:node package*.json ./
RUN npm ci --only=production --no-optional

FROM dependencies
COPY --chown=node:node --from=dependencies /app/node_modules ./node_modules
COPY --chown=node:node . .
CMD ["npm", "start"]