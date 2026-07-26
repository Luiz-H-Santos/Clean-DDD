import { NotificationRepository } from '@/domain/notification/application/repositories/notification-repository.js'
import { Notification } from '@/domain/notification/enterprise/entities/notification.js'

export class InMemoryNotificationRepository implements NotificationRepository {
  public items: Notification[] = []

  async create(notification: Notification) {
    this.items.push(notification)
  }
}
