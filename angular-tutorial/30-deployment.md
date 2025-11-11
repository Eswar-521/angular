# Deployment

Host static builds or SSR with Node/Express; add Docker and caching headers.

```dockerfile
# Dockerfile (static)
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```
**Expected output:** Image serves the compiled app via Nginx; SSR requires a Node server instead.
