const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function seedDatabase() {
    console.log('🌱 Starting database seeding...\n');

    try {
        // Clear existing data
        console.log('🧹 Clearing existing data...');
        await prisma.application.deleteMany();
        await prisma.role.deleteMany();
        await prisma.castingCall.deleteMany();
        await prisma.user.deleteMany();
        console.log('✅ Existing data cleared\n');

        // Create test users
        console.log('👥 Creating test users...');
        
        const hashedPassword = await bcrypt.hash('password123', 10);
        
        const actor1 = await prisma.user.create({
            data: {
                email: 'actor1@test.com',
                password: hashedPassword,
                name: 'John Actor',
                role: 'ACTOR'
            }
        });

        const actor2 = await prisma.user.create({
            data: {
                email: 'actor2@test.com',
                password: hashedPassword,
                name: 'Jane Smith',
                role: 'ACTOR'
            }
        });

        const producer1 = await prisma.user.create({
            data: {
                email: 'producer1@test.com',
                password: hashedPassword,
                name: 'Producer Mike',
                role: 'PRODUCER'
            }
        });

        const producer2 = await prisma.user.create({
            data: {
                email: 'producer2@test.com',
                password: hashedPassword,
                name: 'Sarah Director',
                role: 'PRODUCER'
            }
        });

        console.log('✅ Test users created\n');

        // Create test casting calls
        console.log('🎬 Creating test casting calls...');

        const casting1 = await prisma.castingCall.create({
            data: {
                title: 'Bollywood Romance Film',
                description: 'A heartwarming romantic drama set in Mumbai. Looking for talented actors who can portray complex emotions.',
                location: 'Mumbai, Maharashtra',
                category: 'FILM',
                producerId: producer1.id,
                roles: {
                    create: [
                        {
                            name: 'Lead Male Actor',
                            gender: 'Male',
                            ageRange: '25-30',
                            description: 'Romantic lead, age 25-30. Previous film experience, good dancing skills, Hindi fluency required'
                        },
                        {
                            name: 'Lead Female Actor',
                            gender: 'Female',
                            ageRange: '22-28',
                            description: 'Female lead, age 22-28. Classical dance training, expressive eyes, comfortable with emotional scenes'
                        },
                        {
                            name: 'Supporting Actor - Best Friend',
                            gender: 'Male',
                            ageRange: '25-35',
                            description: 'Comic relief character. Comedy background, age 25-35'
                        }
                    ]
                }
            },
            include: { roles: true }
        });

        const casting2 = await prisma.castingCall.create({
            data: {
                title: 'TV Serial - Daily Soap',
                description: 'Long-running family drama series. Multiple characters needed.',
                location: 'Delhi, NCR',
                category: 'TV_SERIAL',
                producerId: producer2.id,
                roles: {
                    create: [
                        {
                            name: 'Mother Character',
                            gender: 'Female',
                            ageRange: '45-55',
                            description: 'Strong matriarch role, age 45-55. Theater background preferred, Hindi and Punjabi fluency'
                        },
                        {
                            name: 'Young Son',
                            gender: 'Male',
                            ageRange: '20-25',
                            description: 'College student character, age 20-25. Fresh face, good screen presence'
                        }
                    ]
                }
            },
            include: { roles: true }
        });

        const casting3 = await prisma.castingCall.create({
            data: {
                title: 'Web Series - Tech Thriller',
                description: 'Modern thriller series about cyber crime. Dark and intense storyline.',
                location: 'Bangalore, Karnataka',
                category: 'WEB_SERIES',
                producerId: producer1.id,
                roles: {
                    create: [
                        {
                            name: 'Cyber Detective',
                            gender: 'Any',
                            ageRange: '30-40',
                            description: 'Lead investigator role, age 30-40. Intense screen presence, action sequences comfort, English fluency'
                        },
                        {
                            name: 'Hacker Villain',
                            gender: 'Male',
                            ageRange: '25-35',
                            description: 'Antagonist character, age 25-35. Menacing presence, tech-savvy appearance'
                        }
                    ]
                }
            },
            include: { roles: true }
        });

        console.log('✅ Test casting calls created\n');

        // Create test applications
        console.log('📝 Creating test applications...');

        await prisma.application.create({
            data: {
                actorId: actor1.id,
                roleId: casting1.roles[0].id, // Lead Male Actor
                name: 'John Actor',
                email: 'actor1@test.com',
                bio: 'I am a passionate actor with 5 years of experience in theater and independent films. I have trained in classical dance and am fluent in Hindi, English, and Marathi.',
                resume: 'https://via.placeholder.com/800x600/4F46E5/FFFFFF?text=John+Actor+Resume',
                headshots: [
                    'https://via.placeholder.com/400x500/4F46E5/FFFFFF?text=John+Headshot+1',
                    'https://via.placeholder.com/400x500/4F46E5/FFFFFF?text=John+Headshot+2'
                ],
                videos: [
                    'https://via.placeholder.com/800x600/4F46E5/FFFFFF?text=John+Demo+Reel',
                    'https://via.placeholder.com/800x600/4F46E5/FFFFFF?text=John+Monologue'
                ],
                status: 'SUBMITTED'
            }
        });

        await prisma.application.create({
            data: {
                actorId: actor2.id,
                roleId: casting1.roles[1].id, // Lead Female Actor
                name: 'Jane Smith',
                email: 'actor2@test.com',
                bio: 'Trained classical dancer with 3 years of film experience. I specialize in emotional scenes and have won awards for my performances in regional cinema.',
                resume: 'https://via.placeholder.com/800x600/EC4899/FFFFFF?text=Jane+Smith+Resume',
                headshots: [
                    'https://via.placeholder.com/400x500/EC4899/FFFFFF?text=Jane+Headshot+1',
                    'https://via.placeholder.com/400x500/EC4899/FFFFFF?text=Jane+Headshot+2'
                ],
                videos: [
                    'https://via.placeholder.com/800x600/EC4899/FFFFFF?text=Jane+Dance+Demo',
                    'https://via.placeholder.com/800x600/EC4899/FFFFFF?text=Jane+Acting+Reel'
                ],
                status: 'VIEWED'
            }
        });

        await prisma.application.create({
            data: {
                actorId: actor1.id,
                roleId: casting2.roles[1].id, // Young Son
                name: 'John Actor',
                email: 'actor1@test.com',
                bio: 'Fresh graduate from acting school. Eager to start my career in television. I have a youthful appearance and good comic timing.',
                resume: 'https://via.placeholder.com/800x600/10B981/FFFFFF?text=John+TV+Resume',
                headshots: [
                    'https://via.placeholder.com/400x500/10B981/FFFFFF?text=John+Fresh+1',
                    'https://via.placeholder.com/400x500/10B981/FFFFFF?text=John+Fresh+2'
                ],
                videos: ['https://via.placeholder.com/800x600/10B981/FFFFFF?text=John+Comedy+Reel'],
                status: 'SUBMITTED'
            }
        });

        console.log('✅ Test applications created\n');

        // Summary
        const userCount = await prisma.user.count();
        const castingCount = await prisma.castingCall.count();
        const roleCount = await prisma.role.count();
        const applicationCount = await prisma.application.count();

        console.log('📊 Database seeding completed successfully!');
        console.log(`   👥 Users: ${userCount}`);
        console.log(`   🎬 Casting Calls: ${castingCount}`);
        console.log(`   🎭 Roles: ${roleCount}`);
        console.log(`   📝 Applications: ${applicationCount}\n`);

        console.log('🔑 Test Credentials:');
        console.log('   Actors:');
        console.log('     - actor1@test.com / password123 (John Actor)');
        console.log('     - actor2@test.com / password123 (Jane Smith)');
        console.log('   Producers:');
        console.log('     - producer1@test.com / password123 (Producer Mike)');
        console.log('     - producer2@test.com / password123 (Sarah Director)');

    } catch (error) {
        console.error('❌ Error seeding database:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

// Run if this script is executed directly
if (require.main === module) {
    seedDatabase();
}

module.exports = { seedDatabase }; 