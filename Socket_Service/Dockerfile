FROM node:22-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3005
CMD ["node", "src/server.js"]