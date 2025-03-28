# Stage 1: Build the Angular App
FROM node:18 AS build-stage
 
WORKDIR /app
 
# Copy package.json and package-lock.json first for caching
COPY package*.json ./
 
# Install dependencies
RUN npm install --force
 
# Copy the rest of the app source code
COPY . .
 
# Build the Angular app with production optimizations
RUN npx ng build --configuration=production
 
 
 
# Stage 2: Serve the Angular App with Nginx
FROM nginx:alpine
 
# Copy built Angular files from the build stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
 
 
 
# Expose port 80
EXPOSE 80
 
# Start Nginx
CMD ["nginx", "-g", "daemon off;"]