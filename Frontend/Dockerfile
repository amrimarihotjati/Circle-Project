FROM node:20-alpine
WORKDIR /app
COPY package*.json .
RUN npm i
COPY . .
CMD ["npm", "run", "dev"]


# ===============================By Mas Taufik ==========================================
# how to run docker react
# buat file Dockerfile & .dockerignore
#========================================================================================
# ubah di vite.config.ts menjadi
# export default defineConfig({
#   plugins: [react()],
#   server: {
#     host: "0.0.0.0",
#     port: 3000
#   },
# })
#========================================================================================
# isi pada Dockerfile sesuai yang di atas dan .dockerignore sesuai yang sudah di terapkan diatas
# buat images docker contoh:
# docker build -t react-docker/threads:1.0.0 .
# untuk menjalankannya ==============================
# port 3002 menunjukan port custom dan 3000 port default app dan sebelahnya adalah nama images:dan tagnya
# docker run -d -p 3002:3000 react-docker/threads:1.0.0
