FROM node:alpine

WORKDIR /ooo/hana/xdev

COPY . .

RUN yarn

CMD yarn start
