FROM node:16

RUN mkdir /app

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

RUN npm run build

EXPOSE 3000
ENV NODE_ENV production
ENV PORT 3000

CMD ["npm", "start"]