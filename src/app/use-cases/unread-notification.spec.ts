import { SendNotification } from './send-notification';
import { Notification } from '../entities/notification';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { Content } from '../entities/content';
import { NotificationNotFound } from './errors/notification-not-found.errors';
import { makeNotification } from '../../../test/factories/notification.factory';
import { ReadNotification } from './read-notification';
import { UnreadNotification } from './unread-notification';

describe('Unread notification', () => {
  const notificationRepository = new InMemoryNotificationRepository();
  const unreadNotification = new UnreadNotification(notificationRepository);

  it('should be able to unread a notification', async () => {
    const notification = makeNotification({
      readAt: new Date(),
    });

    await notificationRepository.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a non existing notification', () => {
    expect(() => {
      return unreadNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
