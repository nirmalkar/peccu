# Use the official Node.js image.
FROM node:18 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Use a smaller image for production
FROM node:18-slim

# Set the working directory in the container
WORKDIR /app

# Copy the built application from the build stage
COPY --from=build /app ./

# Install only production dependencies
RUN npm install --only=production

# Expose port 3000 for the application
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
