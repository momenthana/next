FROM node:16

WORKDIR /ooo/hana/xdev

COPY . .

RUN npm i --production

CMD npm start
