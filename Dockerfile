FROM node:14-alpine
RUN adduser -S app

RUN apk add postgresql-client


WORKDIR /opt/app
COPY . .

RUN chown -R app /opt/app

USER app

RUN npm install

EXPOSE 3000
CMD [ "npm", "run", "start" ]
