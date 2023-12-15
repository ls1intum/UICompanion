# Use a specific version of node for reproducibility
FROM node:18 AS builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Generate a .npmrc file with the NPM token
ARG NPM_TOKEN
RUN echo "//npm.pkg.github.com/:_authToken=${NPM_TOKEN}" > .npmrc
RUN echo "@ls1intum:registry=https://npm.pkg.github.com" >> .npmrc

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install only production dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Run build step
RUN npm run build

# Start a new, final stage to keep the image lean
FROM node:18-slim

WORKDIR /usr/src/app

# Copy only necessary files and build artifacts from the builder stage
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/lib ./lib
COPY --from=builder /usr/src/app/*.pem ./

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD [ "npm", "start" ]
