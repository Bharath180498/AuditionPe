# API Testing Guide for AuditionPe Backend

## Prerequisites

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Set up your database:**
   ```bash
   npx prisma db push
   npx prisma generate
   ```

3. **Environment Variables Required:**
   - `DATABASE_URL` - Your PostgreSQL connection string
   - `NEXTAUTH_SECRET` - A random secret for NextAuth
   - `NEXTAUTH_URL` - http://localhost:3000
   - `UPLOADTHING_SECRET` - Your UploadThing secret
   - `UPLOADTHING_APP_ID` - Your UploadThing app ID

## Testing Methods

### 1. Using the Frontend (Recommended for Initial Testing)

The easiest way to test is through the UI:
- Go to `http://localhost:3000`
- Sign up as both an actor and producer (use different emails)
- Test the complete flows

### 2. Using Browser DevTools

1. Open browser DevTools (F12)
2. Go to Network tab
3. Use the frontend to make requests
4. Inspect the API calls and responses

### 3. Using cURL Commands

### 4. Using REST Client (VS Code Extension)

### 5. Using Postman/Insomnia

## API Endpoints Testing

### 1. Authentication APIs

#### Sign Up
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "actor@test.com",
    "password": "password123",
    "name": "Test Actor",
    "role": "ACTOR"
  }'
```

#### Sign In (NextAuth)
- Go to `http://localhost:3000/api/auth/signin`
- Or use the login page at `http://localhost:3000/login`

### 2. Auditions/Casting APIs

#### Get All Auditions (Public)
```bash
curl http://localhost:3000/api/auditions
```

#### Get Single Audition
```bash
curl http://localhost:3000/api/auditions/[CASTING_ID]
```

#### Create Casting Call (Producer Only)
```bash
curl -X POST http://localhost:3000/api/casting \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
  -d '{
    "title": "New Movie Casting",
    "description": "Looking for talented actors",
    "location": "Mumbai",
    "category": "FILM",
    "roles": [
      {
        "name": "Lead Actor",
        "description": "Main character",
        "requirements": "5+ years experience"
      }
    ]
  }'
```

#### Get Applicants for Casting (Producer Only)
```bash
curl http://localhost:3000/api/casting/[CASTING_ID]/applicants \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN"
```

### 3. Application APIs

#### Submit Application (Actor Only)
```bash
curl -X POST http://localhost:3000/api/apply \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
  -d '{
    "roleId": "ROLE_ID",
    "bio": "I am a passionate actor...",
    "resumeUrl": "https://example.com/resume.pdf",
    "headshot1Url": "https://example.com/headshot1.jpg",
    "headshot2Url": "https://example.com/headshot2.jpg",
    "videoUrl1": "https://example.com/video1.mp4",
    "videoUrl2": "https://example.com/video2.mp4"
  }'
```

#### Get Actor's Applications
```bash
curl http://localhost:3000/api/actor/profile \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN"
```

## Getting Session Tokens

### Method 1: Browser DevTools
1. Sign in through the frontend
2. Open DevTools → Application → Cookies
3. Find `next-auth.session-token`
4. Copy the value

### Method 2: Using Frontend Console
```javascript
// Run in browser console after signing in
document.cookie.split(';').find(c => c.includes('next-auth.session-token'))
```

## Database Testing

### Check Data Directly
```bash
# Open Prisma Studio
npx prisma studio
```

### Reset Database
```bash
npx prisma db push --force-reset
```

## Common Test Scenarios

### 1. Complete Actor Flow
1. Sign up as actor
2. Browse auditions
3. Apply to an audition
4. Check application status in profile

### 2. Complete Producer Flow
1. Sign up as producer
2. Create a casting call with roles
3. View applications received
4. Check applicant details

### 3. Authentication Testing
1. Try accessing protected routes without login
2. Try accessing actor routes as producer
3. Try accessing producer routes as actor

## Troubleshooting

### Common Issues

1. **401 Unauthorized**
   - Check if you're logged in
   - Verify session token
   - Check user role permissions

2. **500 Internal Server Error**
   - Check database connection
   - Verify environment variables
   - Check server logs in terminal

3. **400 Bad Request**
   - Validate request body format
   - Check required fields
   - Verify data types

### Debug Tips

1. **Check Server Logs**
   ```bash
   # Server logs appear in the terminal where you ran npm run dev
   ```

2. **Enable Debug Mode**
   ```env
   # Add to .env.local
   NODE_ENV=development
   ```

3. **Database Issues**
   ```bash
   # Check database connection
   npx prisma db pull
   
   # Reset if needed
   npx prisma migrate reset
   ```

## Testing Checklist

### Authentication
- [ ] User can sign up as actor
- [ ] User can sign up as producer  
- [ ] User can sign in
- [ ] Protected routes are actually protected
- [ ] Role-based access works

### Actor Features
- [ ] Can view auditions list
- [ ] Can view audition details
- [ ] Can submit application with files
- [ ] Can view own applications
- [ ] Cannot access producer features

### Producer Features
- [ ] Can create casting calls
- [ ] Can add multiple roles
- [ ] Can view applicants
- [ ] Can see application details
- [ ] Cannot access actor-only features

### File Uploads
- [ ] Resume upload works
- [ ] Headshot uploads work  
- [ ] Video uploads work
- [ ] Files are stored correctly

### API Responses
- [ ] All endpoints return proper JSON
- [ ] Error messages are helpful
- [ ] Status codes are correct
- [ ] Required fields are validated

## Performance Testing

### Load Testing (Optional)
```bash
# Install artillery for load testing
npm install -g artillery

# Create a simple load test
artillery quick --count 10 --num 5 http://localhost:3000/api/auditions
```

This guide should help you thoroughly test all aspects of the backend API! 