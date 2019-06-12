FROM node:10-alpine

RUN apk --update --no-cache add bash

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install --production

COPY --chown=node:node . .

EXPOSE 8080

COPY --chown=node:node wait-for.sh /

# CMD [ "node", "server.js" ]
CMD /wait-for.sh db:3306 -- npm start
