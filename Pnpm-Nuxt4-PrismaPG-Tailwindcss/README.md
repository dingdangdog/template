# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Development

Start the development server on `http://localhost:3000`:

```bash

# pnpm
pnpm dev
pnpm build
pnpm preview

# docker
docker build -t project:0.0.1 .
docker save -o project.0.0.1.tar project:0.0.1
docker load -i project.0.0.1.tar

# prisma
npx prisma migrate dev --name init-db
npx prisma migrate deploy
npx prisma generate

# git 
git tag v0.0.1
git push origin tag v0.0.1
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
