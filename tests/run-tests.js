const { seedDatabase } = require('./seed-database');
const { testAPI } = require('./test-api');

async function runAllTests() {
    console.log('🚀 AuditionPe Backend Testing Suite\n');
    console.log('==========================================\n');

    try {
        // Step 1: Seed the database
        console.log('STEP 1: Database Seeding');
        console.log('------------------------');
        await seedDatabase();
        console.log('\n');

        // Wait a moment for database operations to complete
        console.log('⏳ Waiting for database operations to complete...');
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('\n');

        // Step 2: Run API tests
        console.log('STEP 2: API Testing');
        console.log('-------------------');
        await testAPI();
        console.log('\n');

        // Step 3: Summary and next steps
        console.log('STEP 3: Manual Testing Guide');
        console.log('-----------------------------');
        console.log('✅ Automated tests completed successfully!');
        console.log('\n📋 Next Steps for Manual Testing:');
        console.log('1. Open http://localhost:3001 in your browser');
        console.log('2. Test login with these credentials:');
        console.log('   - Actor: actor1@test.com / password123');
        console.log('   - Producer: producer1@test.com / password123');
        console.log('3. Use the REST Client file: tests/api-tests.http');
        console.log('4. Check Prisma Studio: npx prisma studio');
        console.log('\n📁 Testing Files Created:');
        console.log('   - tests/API_TESTING_GUIDE.md (Complete guide)');
        console.log('   - tests/api-tests.http (REST Client tests)');
        console.log('   - tests/test-api.js (Automated API tests)');
        console.log('   - tests/seed-database.js (Database seeding)');
        console.log('   - tests/run-tests.js (This test runner)');

    } catch (error) {
        console.error('❌ Test suite failed:', error.message);
        
        if (error.code === 'ECONNREFUSED') {
            console.log('\n💡 Troubleshooting Tips:');
            console.log('1. Make sure your development server is running:');
            console.log('   npm run dev');
            console.log('2. Check if your database is accessible');
            console.log('3. Verify your environment variables are set');
        }
        
        process.exit(1);
    }
}

// Command line options
const args = process.argv.slice(2);

if (args.includes('--seed-only')) {
    console.log('🌱 Running database seeding only...\n');
    seedDatabase();
} else if (args.includes('--api-only')) {
    console.log('🔗 Running API tests only...\n');
    testAPI();
} else if (args.includes('--help')) {
    console.log('AuditionPe Test Runner\n');
    console.log('Usage: node tests/run-tests.js [options]\n');
    console.log('Options:');
    console.log('  --seed-only    Run database seeding only');
    console.log('  --api-only     Run API tests only');
    console.log('  --help         Show this help message');
    console.log('\nDefault: Run all tests (seeding + API tests)');
} else {
    runAllTests();
}

module.exports = { runAllTests }; 