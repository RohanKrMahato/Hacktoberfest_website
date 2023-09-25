FROM node:16-alpine  AS builder
WORKDIR /code
COPY ./frontend .
RUN npm install --legacy-peer-deps && npm run build

FROM node:16-alpine  AS server
WORKDIR /code
COPY --from=builder /code/build /build
COPY ./backend .
RUN npm install --legacy-peer-deps

EXPOSE 4000

CMD ["npm", "run", "dev"]