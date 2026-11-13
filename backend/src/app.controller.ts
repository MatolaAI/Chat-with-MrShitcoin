import { Controller, Get, Inject } from '@nestjs/common';
import { PrismaService } from './common/prisma/prisma.service';
import Redis from 'ioredis';
import { REDIS_CLIENT } from './common/redis/redis.constants';
@Controller()
export class AppController {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(REDIS_CLIENT) private readonly redis: Redis,
  ) {}
  @Get('health')
  async health() {
    const dbOk = await this.prisma.$queryRaw`SELECT 1`.then(() => true).catch(() => false);
    const redisOk = await this.redis.ping().then((r) => r === 'PONG').catch(() => false);
    return {
      status: dbOk && redisOk ? 'ok' : 'degraded',
      services: { db: dbOk, redis: redisOk },
      timestamp: new Date().toISOString(),
    };
  }
}
