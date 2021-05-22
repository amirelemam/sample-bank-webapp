FROM node:12.22.1-alpine3.11 as dependencies
USER node
WORKDIR /usr/node
COPY --chown=node:node package*.json ./
RUN npm ci --only=production --no-optional

FROM dependencies
USER node
COPY --chown=node:node --from=dependencies /usr/node/node_modules ./node_modules
COPY --chown=node:node . .
CMD ["npm", "start"]
EXPOSE 4010