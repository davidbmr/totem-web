# Multistage Build - Stage 1: Builder
FROM node:20 as builder
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build

# Multistage Build - Stage 2: Lightweight Nginx Image
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
