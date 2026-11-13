import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Controller('conversations')
export class ConversationsController {
  constructor(private prisma: PrismaService) {}

  // Get all conversations + all other users (so Mr. can start new chats)
  @Get('user/:userId')
  async getUserConversations(@Param('userId') userId: string) {
    // 1. Get all existing conversations for this user
    const conversations = await this.prisma.conversation.findMany({
      where: { participants: { some: { userId } } },
      include: {
        participants: { include: { user: true } },
        messages: { orderBy: { createdAt: 'desc' }, take: 1 },
      },
      orderBy: { updatedAt: 'desc' },
    });

    // 2. Get IDs of users we already have conversations with
    const existingUserIds = conversations
      .flatMap((c) => c.participants.map((p) => p.userId))
      .filter((id) => id !== userId);

    // 3. Get all other users who we DON'T have a conversation with yet
    const potentialContacts = await this.prisma.user.findMany({
      where: {
        id: { notIn: [userId, ...existingUserIds] },
      },
      orderBy: { name: 'asc' },
    });

    return { conversations, potentialContacts };
  }

  // Create a new conversation (Direct or Group)
  @Post()
  async createGroup(
    @Body() body: { type: string; title: string; description: string; creatorId: string; participantIds: string[] },
  ) {
    const allParticipants = [body.creatorId, ...body.participantIds];

    // If DIRECT chat, check if it already exists to prevent duplicates
    if (body.type === 'DIRECT') {
      const existing = await this.prisma.conversation.findFirst({
        where: {
          type: 'DIRECT',
          AND: [
            { participants: { some: { userId: body.creatorId } } },
            { participants: { some: { userId: body.participantIds[0] } } },
          ],
        },
      });
      if (existing) return existing;
    }

    return this.prisma.conversation.create({
      data: {
        type: body.type === 'DIRECT' ? 'DIRECT' : 'GROUP',
        title: body.title || null,
        description: body.description || null,
        participants: {
          create: allParticipants.map((userId) => ({ userId })),
        },
      },
    });
  }
}