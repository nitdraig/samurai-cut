FROM node:18

WORKDIR /app

# Copiar package.json y package-lock.json si existen
COPY package.json ./
COPY package-lock.json ./

# Instalar dependencias
RUN npm install --omit=dev

# Copiar el resto del código de la aplicación
COPY . .

EXPOSE 5000

CMD ["node", "index.js"]
