import { NotificationRepository } from '../repositories/notification-repository';
import { Injectable } from '@nestjs/common';

import { NotificationNotFound } from './errors/notification-not-found.errors';

interface CountRecipientNotificationsRequest {
  recipientId: string;
}

interface CountRecipientNotificationsResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotifications {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute({
    recipientId,
  }: CountRecipientNotificationsRequest): Promise<CountRecipientNotificationsResponse> {
    const count = await this.notificationRepository.countManyByRecipientId(
      recipientId,
    );

    return {
      count,
    };
  }
}
