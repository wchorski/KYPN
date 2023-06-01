FROM node:16

RUN mkdir /app

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . ./

RUN yarn build

EXPOSE 3000
ENV NODE_ENV production
ENV PORT 3000

CMD ["yarn", "start"]