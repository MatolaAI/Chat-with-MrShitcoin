import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './common/prisma/prisma.module';
import { RedisModule } from './common/redis/redis.module';
import { envValidationSchema } from './common/config/env.validation';
import { AppController } from './app.controller';
import { MessagesController } from './messages/messages.controller';
import { ConversationsController } from './conversations/conversations.controller'; // NEW

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validationSchema: envValidationSchema, validationOptions: { abortEarly: false } }),
    PrismaModule,
    RedisModule,
  ],
  controllers: [AppController, MessagesController, ConversationsController], // NEW
})
export class AppModule {}