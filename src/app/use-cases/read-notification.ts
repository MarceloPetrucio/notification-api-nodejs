import { NotificationRepository } from '../repositories/notification-repository';
import { Injectable } from '@nestjs/common';

import { NotificationNotFound } from './errors/notification-not-found.errors';

interface ReadNotificationRequest {
  notificationId: string;
}

type ReadNotificationResponse = void;

@Injectable()
export class ReadNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute({
    notificationId,
  }: ReadNotificationRequest): Promise<ReadNotificationResponse> {
    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) throw new NotificationNotFound();

    notification.read();

    await this.notificationRepository.save(notification);
  }
}
