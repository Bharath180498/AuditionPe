# Setup Instructions to Fix NextAuth Issues

## 1. Create Environment Variables

Create a file named `.env.local` in the root directory with the following content:

```bash
# NextAuth Configuration (REQUIRED)
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your-super-secret-key-here-change-this-in-production

# Database (REQUIRED)
DATABASE_URL="postgresql://username:password@localhost:5432/auditionpe"

# UploadThing (OPTIONAL - for file uploads)
UPLOADTHING_SECRET=your-uploadthing-secret
UPLOADTHING_APP_ID=your-uploadthing-app-id
```

## 2. Generate a Secure NEXTAUTH_SECRET

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

Replace `your-super-secret-key-here-change-this-in-production` with the generated value.

## 3. Update Database URL

Replace the DATABASE_URL with your actual PostgreSQL connection string.

## 4. Clear Cache and Restart

After creating the `.env.local` file:

```bash
# Stop the current server (Ctrl+C)
# Clear Next.js cache
rm -rf .next

# Restart the development server
npm run dev
```

## 5. Verify Everything Works

1. The NextAuth warnings should disappear
2. You should be able to access:
   - http://localhost:3001 (Homepage)
   - http://localhost:3001/login (Login page)
   - http://localhost:3001/signup (Signup page)

## Common Issues and Solutions

### Issue: Port 3000 is in use
The server automatically switches to port 3001. Make sure your NEXTAUTH_URL reflects this:
```
NEXTAUTH_URL=http://localhost:3001
```

### Issue: Database connection errors
Make sure PostgreSQL is running and the DATABASE_URL is correct.

### Issue: Build manifest errors persist
1. Stop the server
2. Run: `rm -rf .next node_modules/.cache`
3. Run: `npm install`
4. Run: `npm run dev`

## Testing the Setup

After fixing the environment variables, test with:

```bash
npm test
```

This will:
1. Seed the database with test data
2. Run API tests
3. Verify everything is working

## Need Help?

If issues persist:
1. Check the terminal for specific error messages
2. Verify all environment variables are set correctly
3. Make sure PostgreSQL is running
4. Try running `npx prisma generate` to regenerate the Prisma client 