import { Notification } from '../../enterprise/entities/notification.js'

export interface NotificationRepository {
  create(notification: Notification): Promise<void>
}
