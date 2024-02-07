# Use an official Node runtime as a parent image
FROM node:20 as build
# Set the working directory to /app
WORKDIR /client
# Copy package.json and package-lock.json to the container
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the rest of the application code
COPY . .
# Build the React app
CMD ["npm", "start"]