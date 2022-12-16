import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { NotificationRepository } from '../../app/repositories/notification-repository';
import { PrismaNotificationsRepository } from './prisma/repositories/prisma-notifications-repositories';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationRepository,
      useClass: PrismaNotificationsRepository,
    },
  ],
  exports: [NotificationRepository],
})
export class DatabaseModule {}
