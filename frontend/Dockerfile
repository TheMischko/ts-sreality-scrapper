FROM node:18-alpine
ENV NODE_ENV development
WORKDIR /react-app
COPY ./package.json ./
RUN npm install
COPY . .
EXPOSE 80
CMD ["ls"]
CMD ["npm", "run", "start"]