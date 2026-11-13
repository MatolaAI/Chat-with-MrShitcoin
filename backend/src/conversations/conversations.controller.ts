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

  @Post()
  async createGroup(
    @Body() body: { type: string; title: string; description: string; creatorId: string; participantIds: string[] },
  ) {
    const allParticipants = [body.creatorId, ...body.participantIds];

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