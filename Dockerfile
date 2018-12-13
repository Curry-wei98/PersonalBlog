FROM node:latest

COPY . /home/higuaifan

WORKDIR /home/higuaifan

EXPOSE 8923

CMD node ./service/index.js