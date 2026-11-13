import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const contacts = [
  'Mwarabu💚', 'Angel💚', 'Diana', 'Mshangazi sinza', 'Jamal April',
  'Salha💚', 'Husna💚', 'Ali Kiba', 'Fatma Ally', 'David M.',
  'Amina Issa', 'Joseph Mwita', 'Rehema Juma', 'Neema Mushi',
  'Emmanuel', 'Zainab', 'Kelvin Peter', 'Grace Mushi', 'Baraka Tours',
  'Support Team'
];

async function main() {
  console.log('Seeding database with real contacts...');

  // 1. Create Mr. Shitcoin (Admin) - keep the same email so we don't duplicate
  const admin = await prisma.user.upsert({
    where: { email: 'mr@shitcoin.com' },
    update: {},
    create: {
      email: 'mr@shitcoin.com',
      name: 'Mr. Shitcoin',
      role: 'ADMIN',
    },
  });

  // 2. Create all the real contacts
  for (const name of contacts) {
    // Generate a fake email from their name to satisfy the unique constraint
    const email = name.toLowerCase().replace(/[^a-z0-9]/g, '') + '@test.com';
    
    await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        name,
        role: 'CUSTOMER',
      },
    });
  }

  // 3. Create the 4 real Groups
  const groups = [
    { 
      title: 'Shitcoin introduction', 
      description: 'Welcome to the basics. Group created by Mr. Shitcoin.' 
    },
    { 
      title: 'Cryptocurrency from beginner', 
      description: 'A safe place for beginners to ask questions.' 
    },
    { 
      title: 'Shitcoin Masterclass', 
      description: 'Only admins can post here. Important announcements only.',
      adminOnly: true
    },
    { 
      title: 'Road to dubai', 
      description: 'Planning the next crypto meetup in Dubai.' 
    },
  ];

  for (const group of groups) {
    // Check if group already exists to avoid duplication
    const existing = await prisma.conversation.findFirst({
      where: { title: group.title, type: 'GROUP' }
    });

    if (!existing) {
      await prisma.conversation.create({
        data: {
          type: 'GROUP',
          title: group.title,
          description: group.description,
          adminOnly: group.adminOnly || false,
          participants: {
            create: [{ userId: admin.id }],
          },
        },
      });
    }
  }

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });