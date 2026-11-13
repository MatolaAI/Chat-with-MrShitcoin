import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { REDIS_CLIENT } from './redis.constants';
export const redisProvider: Provider = {
  provide: REDIS_CLIENT,
  inject: [ConfigService],
  useFactory: (config: ConfigService): Redis => {
    const client = new Redis(config.getOrThrow<string>('REDIS_URL'), { maxRetriesPerRequest: null });
    client.on('error', (err) => console.error('[redis] error', err));
    return client;
  },
};
