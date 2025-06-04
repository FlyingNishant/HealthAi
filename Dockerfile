FROM node:23.2.0 AS installer
WORKDIR /app
COPY client/package*.json ./
RUN npm install
COPY client/. ./
RUN npm run build

FROM tomcat
COPY --from=installer /app/dist /usr/local/tomcat/webapps/ROOT
EXPOSE 8080