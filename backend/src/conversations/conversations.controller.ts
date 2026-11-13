import { Controller, Get, Param } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Controller('conversations')
export class ConversationsController {
  constructor(private prisma: PrismaService) {}

  // Get all conversations for a specific user
  @Get('user/:userId')
  async getUserConversations(@Param('userId') userId: string) {
    return this.prisma.conversation.findMany({
      where: {
        participants: {
          some: { userId }, // Only get chats this user is part of
        },
      },
      include: {
        participants: {
          include: { user: true }, // Include user details (name, etc.)
        },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1, // Only get the LAST message for the sidebar preview
        },
      },
      orderBy: {
        updatedAt: 'desc', // Most recent chats at the top
      },
    });
  }
}