import { NotificationRepository } from '../repositories/notification-repository';
import { Injectable } from '@nestjs/common';
import { Notification } from '../entities/notification';

interface GetRecipientNotificationsRequest {
  recipientId: string;
}

interface GetRecipientNotificationsResponse {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotifications {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute({
    recipientId,
  }: GetRecipientNotificationsRequest): Promise<GetRecipientNotificationsResponse> {
    const notifications = await this.notificationRepository.findManyRecipientId(
      recipientId,
    );

    return {
      notifications,
    };
  }
}
