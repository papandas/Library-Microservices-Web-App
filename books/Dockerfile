FROM node

WORKDIR /app

RUN mkdir /app/config

COPY ./config/index.js ./config/

COPY package.json .

RUN npm install --production

COPY book.js .

COPY books.js .

EXPOSE 3001

CMD node books.js