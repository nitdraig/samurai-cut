FROM node:18

WORKDIR /app

# Copiar archivos de dependencias si existen
COPY package.json package-lock.json yarn.lock* ./

# Instalar dependencias
RUN if [ -f yarn.lock ]; then yarn install --production; else npm install --omit=dev; fi

COPY . .

EXPOSE 5000

CMD ["node", "index.js"]
