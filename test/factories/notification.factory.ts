import { Content } from '../../src/app/entities/content';
import {
  Notification,
  NotificationProps,
} from '../../src/app/entities/notification';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    category: 'This is a notification',
    content: new Content('New friend request!.'),
    recipientId: 'recipient-id',
    ...override,
  });
}
