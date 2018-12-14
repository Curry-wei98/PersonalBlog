FROM node:latest

COPY . /home/higuaifan

WORKDIR /home/higuaifan

EXPOSE 8923

CMD npm install && node service/index