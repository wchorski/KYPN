FROM node:16

RUN mkdir /app

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

RUN npm run build

EXPOSE 3001
ENV NODE_ENV production
ENV PORT 3001

CMD ["npm", "start"]