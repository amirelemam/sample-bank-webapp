FROM node:12.22.1-alpine3.11 as dependencies
USER node
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
RUN npm ci --only=production --no-optional

FROM dependencies
COPY --chown=node:node --from=dependencies /usr/src/app/node_modules ./node_modules
COPY . .
ENV NODE_ENV production
CMD ["npm", "start"]
EXPOSE 4020