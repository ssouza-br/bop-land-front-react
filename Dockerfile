# Step 1: Build the React app
FROM node:14 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app, specifying the output directory as 'dist'
RUN npm run build

# Step 2: Serve the React app
FROM nginx:alpine

# Copy the build output to the Nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
