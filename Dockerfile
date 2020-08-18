FROM node:lts-alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn

EXPOSE 3030

CMD ["yarn", "start"]
