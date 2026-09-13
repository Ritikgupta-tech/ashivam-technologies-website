FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY server/prisma ./server/prisma
RUN npm ci && npm install typescript tsx --no-save
COPY server ./server
COPY tsconfig.json ./
EXPOSE 4000
# Applies any pending migrations, then starts the API. Safe to run on
# every boot — a no-op when the schema is already up to date.
CMD ["sh", "-c", "npx prisma migrate deploy --schema server/prisma/schema.prisma && npx tsx server/src/index.ts"]
