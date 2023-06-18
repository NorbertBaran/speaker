FROM node:18.16.0-alpine as build
WORKDIR /app
COPY . .
RUN rm -r src/config
ARG CONFIG
COPY ${CONFIG} src/config/config.ts
RUN yarn install
RUN yarn build

FROM nginx:1.25.0-alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist .
EXPOSE 80
CMD ["nginx","-g","daemon off;"]