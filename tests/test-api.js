const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3001';

async function testAPI() {
    console.log('🚀 Starting API Tests...\n');

    try {
        // Test 1: Sign up a new user
        console.log('1. Testing User Signup...');
        const signupResponse = await fetch(`${BASE_URL}/api/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: `test-${Date.now()}@example.com`,
                password: 'password123',
                name: 'Test User',
                role: 'ACTOR'
            })
        });

        if (signupResponse.ok) {
            console.log('✅ Signup successful');
        } else {
            console.log('❌ Signup failed:', await signupResponse.text());
        }

        // Test 2: Get all auditions (public endpoint)
        console.log('\n2. Testing Get All Auditions...');
        const auditionsResponse = await fetch(`${BASE_URL}/api/auditions`);
        
        if (auditionsResponse.ok) {
            const auditions = await auditionsResponse.json();
            console.log(`✅ Auditions endpoint working - Found ${auditions.length} auditions`);
        } else {
            console.log('❌ Auditions endpoint failed:', await auditionsResponse.text());
        }

        // Test 3: Test protected endpoint without auth (should fail)
        console.log('\n3. Testing Protected Endpoint (should fail)...');
        const protectedResponse = await fetch(`${BASE_URL}/api/actor/profile`);
        
        if (protectedResponse.status === 401) {
            console.log('✅ Protected endpoint properly secured');
        } else {
            console.log('❌ Protected endpoint not secured properly');
        }

        // Test 4: Check if server is running properly
        console.log('\n4. Testing Server Health...');
        const healthResponse = await fetch(`${BASE_URL}/`);
        
        if (healthResponse.ok) {
            console.log('✅ Server is running and responding');
        } else {
            console.log('❌ Server health check failed');
        }

    } catch (error) {
        console.error('❌ API Test Error:', error.message);
        
        if (error.code === 'ECONNREFUSED') {
            console.log('\n💡 Make sure your development server is running:');
            console.log('   npm run dev');
        }
    }

    console.log('\n🏁 API Tests Complete!');
}

// Run if this script is executed directly
if (require.main === module) {
    testAPI();
}

module.exports = { testAPI }; 