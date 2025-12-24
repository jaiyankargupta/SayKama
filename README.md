This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

# Local development notes

These notes describe additional local setup for the SayKama project (auth, database, uploads).

## Environment variables (.env.local)

Create a `.env.local` at the project root (same folder as `package.json`) and add:

MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=some-very-secret-string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_BASE_URL=http://localhost:3000

Notes:
- `MONGODB_URI` should point to your MongoDB Atlas or other MongoDB instance.
- `JWT_SECRET` is used to sign authentication tokens — use a long, random value.
- Cloudinary variables are used for image uploads if you enable that feature.
- `NEXT_PUBLIC_BASE_URL` helps server components call internal API routes when running locally.

## Install required dependencies (additional)

Run this inside the `saykama` directory:

```bash
npm install mongoose bcrypt jsonwebtoken cloudinary
```

If you use yarn / pnpm, use the corresponding commands.

## How auth works (summary)

- Registration: POST /api/auth/register — creates a user with a hashed password.
- Login: POST /api/auth/login — validates credentials and sets an httpOnly cookie `token` (JWT).
- Current user: GET /api/auth/me — reads the token cookie and returns the current user.
- Logout: GET or POST /api/auth/logout — clears the `token` cookie.

The dashboard is implemented as a server component that forwards request cookies to `/api/auth/me` to verify authentication on the server side.

## Run the app

```bash
npm run dev
```

Visit http://localhost:3000 and use the Register / Login pages to create an account and view the dashboard.

## Further work / TODO

- Add product model, admin product CRUD, and product pages.
- Add Cloudinary upload API and connect frontend upload UI.
- Add order and payment models and integrate a payment provider (e.g., Stripe/PayPal/UPI flow).
- Harden validation, error handling, and add tests.

