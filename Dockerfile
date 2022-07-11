FROM node:lts-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY . .

RUN yarn

EXPOSE 3030

CMD ["yarn", "start"]
