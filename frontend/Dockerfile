FROM node:16.13.2-alpine3.15

RUN addgroup app && adduser -S -G app app
USER app
WORKDIR /app/
RUN mkdir data

COPY --chown=app:app package*.json .
RUN npm install
COPY --chown=app:app . .

EXPOSE 3000
CMD ["npm", "start"]