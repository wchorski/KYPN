FROM node:16-alpine

RUN mkdir /app

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . ./

RUN yarn build

EXPOSE 3000
ENV NODE_ENV production
ENV PORT 3000

CMD ["yarn", "start"]