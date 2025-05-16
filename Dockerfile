FROM node:20-alpine AS builder
WORKDIR /app

ENV VITE_API_URL=https://smartinv-backend-981960171139.europe-southwest1.run.app/api

COPY package*.json ./
RUN npm install

COPY . .

# .env may overwrite something in the dockerfile1
RUN rm -f .env
RUN echo "VITE_API_URL during build: $VITE_API_URL"

RUN npm run build

FROM nginx:stable-alpine AS production
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
