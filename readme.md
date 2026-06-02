# Project Setup

## Prerequisites

Make sure the following are installed:

- Node.js (v20+ recommended)
- npm
- Supabase CLI

Verify installation:

```bash
node -v
npm -v
npx supabase --version
```

---

## Clone Repository

```bash
git clone <repository-url>
cd <project-folder>
```

---

## Install Dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the project root.

Example:

```env
PORT=3000

SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Obtain these values from:

Supabase Dashboard
→ Project Settings
→ API

---

## Supabase Authentication

Login to Supabase:

```bash
npx supabase login
```

A browser window will open for authentication.

Verify login:

```bash
npx supabase projects list
```

---

## Link Project

Get the project reference from:

Supabase Dashboard
→ Settings
→ General
→ Reference ID

Link the local project:

```bash
npx supabase link --project-ref <PROJECT_REF>
```

Example:

```bash
npx supabase link --project-ref abcdefghijklmnop
```

---

## Run Database Migrations

Apply all pending migrations:

```bash
npx supabase db push
```

---

## Create New Migration

```bash
npx supabase migration new migration_name
```

Example:

```bash
npx supabase migration new create_users_table
```

Migration files will be created in:

```text
supabase/migrations/
```

---

## Start Development Server

```bash
npm run dev
```

---

## Production Deployment

### Install Dependencies

```bash
npm install --production
```

### Apply Database Migrations

```bash
npx supabase db push
```

### Start Application

```bash
npm start
```

---

## Common Supabase Commands

### Login

```bash
npx supabase login
```

### Logout

```bash
npx supabase logout
```

### List Projects

```bash
npx supabase projects list
```

### Link Project

```bash
npx supabase link --project-ref <PROJECT_REF>
```

### Check Linked Project

```bash
npx supabase status
```

### Create Migration

```bash
npx supabase migration new migration_name
```

### Apply Migrations

```bash
npx supabase db push
```

### Reset Local Database

```bash
npx supabase db reset
```

⚠️ Use only for local development.

---

## Database Workflow

1. Create migration:

```bash
npx supabase migration new add_users_table
```

2. Add SQL to migration file.

3. Apply migration:

```bash
npx supabase db push
```

4. Commit migration files:

```bash
git add .
git commit -m "Add users table migration"
git push
```

5. Other developers pull latest code and run:

```bash
npx supabase db push
```

to synchronize their database schema.

---

## Project Structure

```text
project/
│
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── config/
│   ├── repositories/
│   └── app.js
│
├── supabase/
│   └── migrations/
│
├── .env
├── package.json
└── README.md
```