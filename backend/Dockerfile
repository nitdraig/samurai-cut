FROM node:18

WORKDIR /app

# Copiar package.json y cualquier archivo de lock si existe
COPY package.json ./
COPY package-lock.json ./
COPY yarn.lock ./

# Instalar dependencias (detecta si usar npm o yarn)
RUN if [ -f yarn.lock ]; then yarn install --production; elif [ -f package-lock.json ]; then npm install --omit=dev; else echo "No lockfile found!"; fi

# Copiar el resto del código
COPY . .

EXPOSE 5000

CMD ["node", "index.js"]
