// Debug script to check authentication setup

console.log('🔍 Checking Authentication Configuration...\n');

// Check environment variables
const requiredEnvVars = ['NEXTAUTH_URL', 'NEXTAUTH_SECRET', 'DATABASE_URL'];
const missingVars = [];

requiredEnvVars.forEach(varName => {
    if (!process.env[varName]) {
        missingVars.push(varName);
        console.log(`❌ ${varName}: Not set`);
    } else {
        console.log(`✅ ${varName}: Set`);
        if (varName === 'NEXTAUTH_URL') {
            console.log(`   Value: ${process.env[varName]}`);
        }
    }
});

console.log('\n📋 Summary:');
if (missingVars.length > 0) {
    console.log(`⚠️  Missing environment variables: ${missingVars.join(', ')}`);
    console.log('\n💡 To fix this:');
    console.log('1. Create a .env.local file in the project root');
    console.log('2. Add the missing variables (see SETUP_INSTRUCTIONS.md)');
    console.log('3. Restart the development server');
} else {
    console.log('✅ All required environment variables are set!');
}

// Check if running on correct port
const nextAuthUrl = process.env.NEXTAUTH_URL;
if (nextAuthUrl && nextAuthUrl.includes('3000') && process.argv.includes('3001')) {
    console.log('\n⚠️  Port mismatch detected!');
    console.log('   NEXTAUTH_URL is set to port 3000 but server is running on port 3001');
    console.log('   Update NEXTAUTH_URL to: http://localhost:3001');
}

console.log('\n🔗 Useful Links:');
console.log('- Setup Instructions: SETUP_INSTRUCTIONS.md');
console.log('- Test Suite: npm test');
console.log('- API Tests: tests/api-tests.http');

// Try to connect to database
if (process.env.DATABASE_URL) {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    
    console.log('\n🗄️  Testing database connection...');
    prisma.$connect()
        .then(() => {
            console.log('✅ Database connection successful!');
            return prisma.$disconnect();
        })
        .catch((error) => {
            console.log('❌ Database connection failed:', error.message);
            console.log('   Make sure PostgreSQL is running and DATABASE_URL is correct');
        });
} 