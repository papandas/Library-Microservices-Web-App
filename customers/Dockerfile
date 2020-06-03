FROM node

WORKDIR /app

RUN mkdir /app/config

COPY ./config/index.js ./config/

COPY package.json .

RUN npm install --production

COPY customer.js .

COPY customers.js .

EXPOSE 3002

CMD node customers.js