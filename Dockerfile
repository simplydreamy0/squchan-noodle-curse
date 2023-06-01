FROM node:19.8.1-bullseye

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY main.js .

CMD ["node", "main.js"]
