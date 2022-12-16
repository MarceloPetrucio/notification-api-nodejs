import { SendNotification } from './send-notification';
import { Notification } from '../entities/notification';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repository';

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const sendNotification = new SendNotification(notificationRepository);

    const { notification } = await sendNotification.execute({
      category: 'This is a notification',
      content: 'social',
      recipientId: 'example-recipient-id',
    });

    expect(notificationRepository.notifications).toHaveLength(1);
    expect(notification).toEqual(notificationRepository.notifications[0]);
  });
});
