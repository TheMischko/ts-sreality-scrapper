FROM node:18-alpine
ENV NODE_ENV development
WORKDIR /react-app
COPY ./package.json ./
RUN npm install
COPY . .
EXPOSE 3000
RUN npm run build
RUN npm install -g serve
CMD ["serve", "-s", "build"]