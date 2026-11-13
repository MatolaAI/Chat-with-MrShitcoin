import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
@Controller('messages')
export class MessagesController {
  constructor(private prisma: PrismaService) {}
  @Get(':conversationId')
  async getMessages(@Param('conversationId') conversationId: string) {
    return this.prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'asc' },
      include: { sender: true },
    });
  }
  @Post()
  async createMessage(@Body() body: { conversationId: string; senderId: string; text: string }) {
    return this.prisma.message.create({
      data: {
        conversationId: body.conversationId,
        senderId: body.senderId,
        body: body.text,
      },
    });
  }
}
