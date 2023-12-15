# Use a specific version of node for reproducibility
FROM node:18 AS builder

# Set the working directory in the container
WORKDIR /usr/src/server

# Argument for npm token
ARG NPM_TOKEN

# Setup npm token for private registry
RUN echo "//npm.pkg.github.com/:_authToken=${NPM_TOKEN}" > .npmrc && \
    echo "@ls1intum:registry=https://npm.pkg.github.com" >> .npmrc

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install only production dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Clean up npm token for security reasons
RUN rm -f .npmrc

# Start a new, final stage to keep the image lean
FROM node:18-slim

WORKDIR /usr/src/server

# Copy only necessary files and build artifacts from the builder stage
COPY --from=builder /usr/src/server /usr/src/server

# Expose the port the app runs on
EXPOSE 3001

# Define the command to run the app
CMD ["npm", "start"]
