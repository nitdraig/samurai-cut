# Etapa de construcción
FROM node:18-alpine AS builder

# Directorio de trabajo
WORKDIR /app

# Copiamos package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código
COPY . .

# Compilamos el proyecto (asegúrate de tener configurado "build": "tsc" en package.json)
RUN npm run build


# Copiamos el código compilado desde la etapa builder
COPY --from=builder /app/dist ./dist

# Exponemos el puerto (ajústalo si es necesario)
EXPOSE 5000

# Comando de inicio
CMD ["node", "dist/index.js"]
