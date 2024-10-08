# Stage 1: Build the React app
FROM node:alpine3.19 AS build

#Declare build time environment variables
ARG VITE_SERVER_URL

#Set default values for environmental variables
ENV VITE_SERVER_URL=$VITE_SERVER_URL

#Build App
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the React app with Nginx
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=build /app/dist .
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]