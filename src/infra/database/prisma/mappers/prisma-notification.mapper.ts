import { Notification } from '@app/entities/notification';
import { Notification as RawNotification } from '@prisma/client';
import { Content } from '../../../../app/entities/content';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification): RawNotification {
    return {
      id: notification.id,
      category: notification.category,
      content: notification.content.value,
      recipientId: notification.recipientId,
      readAt: notification.readAt as Date | null,
      createdAt: notification.createdAt,
      canceledAt: notification.canceledAt as Date | null,
    };
  }

  static toDomain(raw: RawNotification): Notification {
    return new Notification(
      {
        category: raw.category,
        content: new Content(raw.content),
        recipientId: raw.recipientId,
        canceledAt: raw.canceledAt,
        createdAt: raw.createdAt,
        readAt: raw.readAt,
      },
      raw.id,
    );
  }
}
