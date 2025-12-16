1. Create App
```
mkdir craft-tracker
cd craft-tracker
git init
```

2. Create the frontend
```
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install
npm run dev
```

3. Add PWA
```
npm install -D vite-plugin-pwa
```

4. Set up the backend, dependencies, and typescript
```
cd ..
mkdir backend
cd backend
npm init -y
npm install express cors
npm install -D typescript ts-node-dev @types/node @types/express
npx tsc --init
```

5. Start postgres
```
docker run --name craft-postgres \
  -e POSTGRES_USER=craftappshivani \
  -e POSTGRES_PASSWORD=<YOUR_PASSWORD> \
  -e POSTGRES_DB=craftdb \
  -p 5432:5432 \
  -d postgres:16
```

6. env file in the backend
```
DATABASE_URL="postgresql://<USERNAME>:<YOUR_PASSWORD>@localhost:5432/craftdb?schema=public"
```

7. Prisma Download
```
npm install -D prisma
npm install @prisma/client
npx prisma init
npx prisma migrate dev --name init
```

8. To test with Ngrok
```
ngrok http 5173
```
Open the link provided on phone and then Add to Home Screen