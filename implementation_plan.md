# Admin Panel & Authentication Implementation

This plan details the integration of an Admin Panel, Database (Prisma), and Authentication (NextAuth.js/Auth.js) into the Bhadohi Arts Weave website.

> [!IMPORTANT]
> **User Review Required**: Please review the database and authentication choices before we proceed.

## Proposed Architecture

1. **Authentication (Auth.js / NextAuth)**
   - **Google Login**: For standard customers/users.
   - **Email/Password Login**: For Admin access only (using bcrypt for secure password hashing).
   - **Role-Based Access Control (RBAC)**: Users will have a `role` field (`USER` or `ADMIN`). Only users with the `ADMIN` role will be able to access the `/admin` dashboard.
2. **Database (Prisma + SQLite)**
   - We will use **SQLite** for the database as it requires no external server setup and is perfect for local development. (If you prefer PostgreSQL or MySQL, please let me know).
3. **Protected Routes**
   - We will implement Next.js Middleware to ensure that any route under `/admin` is strictly protected and redirects unauthenticated users to the login page.

## Open Questions

> [!WARNING]
> Please provide feedback on these questions so I can proceed correctly:

1. **Google OAuth Credentials**: I will need a `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` to make Google Login work. I can set these up with placeholder values for now, but you will eventually need to create these in the Google Cloud Console and add them to the `.env` file. Should I use placeholders?
2. **Database Choice**: Is **SQLite** acceptable for this stage of development? It stores the database in a local file.
3. **Admin Account**: I will create a default admin account (e.g., `admin@bhadohiartsweave.in` / `admin123`) so you can log in immediately. Does this sound good?

## Proposed Changes

### Dependencies
#### [NEW] Dependencies
- `next-auth@beta` (Auth.js for Next.js 15)
- `@prisma/client`
- `@auth/prisma-adapter`
- `bcryptjs` and `@types/bcryptjs`

---

### Database Setup
#### [NEW] `prisma/schema.prisma`
- Define `User`, `Account`, `Session`, and `VerificationToken` models (required by NextAuth).
- Add `role` enum (`USER`, `ADMIN`) to the `User` model.

---

### Authentication Configuration
#### [NEW] `src/auth.ts`
- Core NextAuth configuration exporting `handlers`, `auth`, `signIn`, and `signOut`.
#### [NEW] `src/app/api/auth/[...nextauth]/route.ts`
- The Next.js API route to handle all authentication requests.
#### [NEW] `middleware.ts`
- Protects the `/admin` routes.

---

### User Interface & Admin Panel
#### [NEW] `src/app/(auth)/login/page.tsx`
- A beautifully designed login page matching the brand's aesthetic, featuring a "Sign in with Google" button and a separate Email/Password form for the Admin.
#### [NEW] `src/app/admin/layout.tsx` & `src/app/admin/page.tsx`
- The secure Admin Dashboard layout featuring a sidebar navigation for managing content (Products, Users, etc.).
#### [MODIFY] `src/components/layout/Header.tsx`
- Update the header to show "Login" or the user's Avatar/Name when authenticated.

## Verification Plan

### Automated Tests
- `npm run build` to ensure the new Prisma schema and NextAuth types compile correctly.

### Manual Verification
- We will start the dev server and test:
  1. Attempting to access `/admin` while logged out (should redirect to `/login`).
  2. Logging in with the seeded Admin credentials (should grant access to `/admin`).
  3. Clicking the Google Login button (will redirect to Google's consent screen).
