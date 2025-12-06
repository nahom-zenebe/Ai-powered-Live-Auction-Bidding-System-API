
    FROM node:18-alpine AS base
    WORKDIR /app
    
   
    FROM base AS deps
    COPY package*.json ./
    RUN npm install --production=false
    

    FROM deps AS build
    COPY . .
    RUN npm run build
    

    FROM node:18-alpine AS prod
    WORKDIR /app
    
  
    COPY package*.json ./
    RUN npm install --only=production
    

    COPY --from=build /app/dist ./dist  
   
    
    EXPOSE 5001
    
    CMD ["node", "dist/server.js"]
    
    