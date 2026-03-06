# Build Stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Set VITE environment variables for build
ARG VITE_API_BASE
ARG VITE_SOCKET_BASE
ENV VITE_API_BASE=$VITE_API_BASE
ENV VITE_SOCKET_BASE=$VITE_SOCKET_BASE
RUN npm run build

# Production Stage
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Standard Nginx config for SPA
RUN echo 'server { listen 80; location / { root /usr/share/nginx/html; try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
