import { SendNotification } from './send-notification';
import { Notification } from '../entities/notification';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { Content } from '../entities/content';
import { NotificationNotFound } from './errors/notification-not-found.errors';
import { CountRecipientNotifications } from './count-recipient-notifications';
import { makeNotification } from '../../../test/factories/notification.factory';

describe('Count recipient notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationRepository,
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );
    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );
    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-2' }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);
  });
});
