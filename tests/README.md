# AuditionPe Testing Suite

This folder contains all testing tools and scripts for the AuditionPe backend API.

## Quick Start

1. **Make sure your development server is running:**
   ```bash
   npm run dev
   ```

2. **Run all tests (seeding + API tests):**
   ```bash
   npm test
   ```

## Testing Scripts

### NPM Scripts
- `npm test` - Run complete testing suite (seeding + API tests)
- `npm run test:seed` - Seed database with test data only
- `npm run test:api` - Run API tests only
- `npm run test:help` - Show help for test runner

### Direct Node Scripts
- `node tests/run-tests.js` - Full test suite
- `node tests/seed-database.js` - Database seeding
- `node tests/test-api.js` - API tests only

## Files Overview

### 📄 `API_TESTING_GUIDE.md`
Complete documentation for testing the backend APIs including:
- Prerequisites and setup
- All available endpoints
- cURL examples
- Troubleshooting guide
- Testing checklist

### 🔧 `run-tests.js`
Main test runner that coordinates all testing activities:
- Seeds database with test data
- Runs automated API tests
- Provides guidance for manual testing

### 🌱 `seed-database.js`
Database seeding script that creates:
- 4 test users (2 actors, 2 producers)
- 3 casting calls with multiple roles
- Sample applications
- All with realistic Indian entertainment industry data

### 🧪 `test-api.js`
Automated API testing script that verifies:
- User signup endpoint
- Public auditions endpoint
- Protected endpoint security
- Server health

### 📡 `api-tests.http`
REST Client file for VS Code (requires REST Client extension):
- Pre-configured requests for all endpoints
- Authentication examples
- Error testing scenarios
- Easy copy-paste for manual testing

## Test Credentials

After running the seed script, you can use these credentials:

### Actors
- **Email:** `actor1@test.com` **Password:** `password123` (John Actor)
- **Email:** `actor2@test.com` **Password:** `password123` (Jane Smith)

### Producers  
- **Email:** `producer1@test.com` **Password:** `password123` (Producer Mike)
- **Email:** `producer2@test.com` **Password:** `password123` (Sarah Director)

## Manual Testing Workflows

### 1. Complete Actor Flow
1. Sign in as `actor1@test.com`
2. Browse auditions at `/auditions`
3. Click on a casting call to view details
4. Submit an application with files
5. Check application status at `/actor/profile`

### 2. Complete Producer Flow
1. Sign in as `producer1@test.com`  
2. Go to `/producer/dashboard`
3. Create new casting call at `/producer/new`
4. View existing casting calls
5. Check applications received

### 3. Authentication Testing
1. Try accessing protected routes without login
2. Verify role-based access control
3. Test logout functionality

## Database Tools

### Prisma Studio
View and edit database data directly:
```bash
npx prisma studio
```

### Reset Database
Clear all data and start fresh:
```bash
npx prisma db push --force-reset
```

## Using REST Client (VS Code)

1. Install "REST Client" extension in VS Code
2. Open `api-tests.http` file
3. Update variables at the top after signing in
4. Click "Send Request" above any request
5. View responses in VS Code

## Getting Session Tokens

For authenticated requests, you need session tokens:

1. **Browser Method:**
   - Sign in through frontend
   - Open DevTools → Application → Cookies  
   - Copy `next-auth.session-token` value

2. **Console Method:**
   ```javascript
   // Run in browser console after signing in
   document.cookie.split(';').find(c => c.includes('next-auth.session-token'))
   ```

## Troubleshooting

### Common Issues

1. **Connection Refused**
   - Make sure dev server is running: `npm run dev`
   - Check if port 3001 is available

2. **Database Errors**
   - Verify DATABASE_URL in .env
   - Run: `npx prisma generate`
   - Check database connection

3. **Authentication Errors**
   - Verify NEXTAUTH_SECRET in .env
   - Clear browser cookies
   - Check session token validity

### Environment Variables Required

```env
DATABASE_URL="your-postgresql-connection-string"
NEXTAUTH_SECRET="your-random-secret"
NEXTAUTH_URL="http://localhost:3001"
UPLOADTHING_SECRET="your-uploadthing-secret"
UPLOADTHING_APP_ID="your-uploadthing-app-id"
```

## API Endpoints Summary

### Public
- `GET /api/auditions` - List all auditions
- `POST /api/auth/signup` - User registration

### Actor Only
- `GET /api/actor/profile` - Get actor's applications
- `POST /api/apply` - Submit application

### Producer Only  
- `POST /api/casting` - Create casting call
- `GET /api/casting` - List producer's casting calls
- `GET /api/casting/[id]/applicants` - View applicants

### Authentication
- NextAuth handles `/api/auth/*` routes
- Session-based authentication with JWT

Happy Testing! 🚀 