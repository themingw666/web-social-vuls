FROM node:20

WORKDIR /usr/app

COPY . .

RUN npm install

RUN npm update

RUN chmod 755 src/scripts/entrypoint.sh

EXPOSE 3000