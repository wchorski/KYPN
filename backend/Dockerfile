FROM node:16-alpine
WORKDIR /app

# # Install dependencies based on the preferred package manager
# COPY package.json yarn.lock* ./
# # KEYSTONE file required for post install scripts
# COPY keystone.ts schema.* auth.ts ./
COPY . .

RUN yarn install
RUN yarn build


EXPOSE 3001
ENV NODE_ENV production
ENV PORT 3001

CMD ["yarn", "start"]