import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Create Mr. Shitcoin (Admin)
  const admin = await prisma.user.upsert({
    where: { email: 'mr@shitcoin.com' },
    update: {},
    create: {
      email: 'mr@shitcoin.com',
      name: 'Mr. Shitcoin',
      role: 'ADMIN',
    },
  });

  // 2. Create a few contacts
  const users = await Promise.all([
    prisma.user.upsert({ where: { email: 'mwarabu@test.com' }, update: {}, create: { email: 'mwarabu@test.com', name: 'Mwarabu💚' } }),
    prisma.user.upsert({ where: { email: 'angel@test.com' }, update: {}, create: { email: 'angel@test.com', name: 'Angel💚' } }),
    prisma.user.upsert({ where: { email: 'diana@test.com' }, update: {}, create: { email: 'diana@test.com', name: 'Diana' } }),
  ]);

  // 3. Create a Direct Conversation between Mr. Shitcoin and Mwarabu
  const directChat = await prisma.conversation.create({
    data: {
      type: 'DIRECT',
      participants: {
        create: [
          { userId: admin.id },
          { userId: users[0].id },
        ],
      },
    },
  });

  // 4. Add messages to the direct chat
  await prisma.message.createMany({
    data: [
      { conversationId: directChat.id, senderId: users[0].id, body: 'Habari za asubuhi?' },
      { conversationId: directChat.id, senderId: admin.id, body: 'Nzuri sana, wewe je?' },
    ],
  });

  // 5. Create a Group
  const groupChat = await prisma.conversation.create({
    data: {
      type: 'GROUP',
      title: 'Shitcoin introduction',
      description: 'Welcome to the basics.',
      adminOnly: false,
      participants: {
        create: [
          { userId: admin.id },
          { userId: users[1].id },
          { userId: users[2].id },
        ],
      },
    },
  });

  // 6. Add messages to the group
  await prisma.message.create({
    data: {
      conversationId: groupChat.id,
      senderId: admin.id,
      body: 'Welcome everyone to the group!',
    },
  });

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