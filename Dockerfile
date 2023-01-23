FROM node:12

WORKDIR /app

COPY ./package.json .c
RUN npm install
COPY . .

EXPOSE 3000

# CMD npm start
CMD [ "node", "tracker.js" ]