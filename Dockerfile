FROM node:14-alpine

USER root

# RUN apk --update add alpine-sdk python2

COPY . /root/splitwise-sms

WORKDIR /root/splitwise-sms

RUN npm install

CMD ["node", "app.js"]