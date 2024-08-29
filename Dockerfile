# Use a imagem base do Node.js
FROM node:18

# Crie e defina o diretório de trabalho
WORKDIR /app

# Copie o package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos da aplicação
COPY . .

# Instale o ts-node e typescript globalmente
RUN npm install -g ts-node typescript

# Exponha a porta 3000
EXPOSE 3000

# Comando para iniciar a aplicação usando ts-node
CMD ["ts-node", "src/main.ts"]
