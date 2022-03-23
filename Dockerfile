FROM node:16

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

COPY . /app
RUN npx prisma generate
EXPOSE 3030
CMD [ "node", "index.js" ]