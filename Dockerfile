FROM node:19.8.1-alpine3.17

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY main.js .

CMD ["node", "main.js"]
