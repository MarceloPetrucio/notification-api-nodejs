import { SendNotification } from './send-notification';
import { Notification } from '../entities/notification';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { Content } from '../entities/content';
import { NotificationNotFound } from './errors/notification-not-found.errors';
import { makeNotification } from '../../../test/factories/notification.factory';
import { ReadNotification } from './read-notification';

describe('Read notification', () => {
  const notificationRepository = new InMemoryNotificationRepository();
  const readNotification = new ReadNotification(notificationRepository);

  it('should be able to read a notification', async () => {
    const notification = makeNotification();

    await notificationRepository.create(notification);

    await readNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read a non existing notification', () => {
    expect(() => {
      return readNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
