import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Controller('users')
export class UsersController {
  constructor(private prisma: PrismaService) {}

  // Get all users (for the group creation menu)
  @Get()
  async getAllUsers() {
    return this.prisma.user.findMany({
      orderBy: { name: 'asc' },
    });
  }
}