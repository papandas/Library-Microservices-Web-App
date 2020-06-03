FROM node

WORKDIR /app

RUN mkdir /app/config

COPY ./config/index.js ./config/

COPY package.json .

RUN npm install --production

COPY order.js .

COPY orders.js .

EXPOSE 3003

CMD node orders.js