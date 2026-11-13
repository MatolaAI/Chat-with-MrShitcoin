import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Controller('conversations')
export class ConversationsController {
  constructor(private prisma: PrismaService) {}

  @Get('user/:userId')
  async getUserConversations(@Param('userId') userId: string) {
    return this.prisma.conversation.findMany({
      where: { participants: { some: { userId } } },
      include: {
        participants: { include: { user: true } },
        messages: { orderBy: { createdAt: 'desc' }, take: 1 },
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  // NEW: Create a group
  @Post()
  async createGroup(
    @Body() body: { type: string; title: string; description: string; creatorId: string; participantIds: string[] },
  ) {
    const allParticipants = [body.creatorId, ...body.participantIds];

    return this.prisma.conversation.create({
      data: {
        type: 'GROUP',
        title: body.title,
        description: body.description,
        participants: {
          create: allParticipants.map((userId) => ({ userId })),
        },
      },
    });
  }
}