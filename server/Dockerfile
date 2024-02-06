# Use an official Node runtime as a parent image
FROM node:14
# Set the working directory to /app
WORKDIR /server
# Copy package.json and package-lock.json to the container
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the rest of the application code
COPY . .
# Expose the API port specified in the .env file
ENV API_PORT=3001
EXPOSE $API_PORT
# Copy the .env file to the container
COPY .env .env
# Command to run the application
CMD ["npm", "start"]