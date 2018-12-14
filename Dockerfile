FROM node:latest

COPY . /home/higuaifan

WORKDIR /home/higuaifan

EXPOSE 8923

CMD cnpm install

CMD node ./service/index.js