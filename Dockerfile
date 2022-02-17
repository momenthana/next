FROM node:16-alpine

WORKDIR /ooo/hana/xdev

COPY . .

RUN yarn

CMD yarn start
