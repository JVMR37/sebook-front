FROM node:lts-alpine

WORKDIR /app/sebook/client

COPY package*.json yarn.* ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
