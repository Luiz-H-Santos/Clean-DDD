import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { Either, right } from '@/core/either.js'
import { Notification } from '../../enterprise/entities/notification.js'
import { NotificationRepository } from '../repositories/notification-repository.js'

interface SendNotificationUseCaseRequest {
  recipientId: string
  title: string
  content: string
}

type SendNotificationUseCaseResponse = Either<
  null,
  {
    notification: Notification
  }
>

export class SendNotificationUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute({
    recipientId,
    title,
    content,
  }: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {
    const notification = Notification.create({
      recipientId: new UniqueEntityId(recipientId),
      title,
      content,
    })

    await this.notificationRepository.create(notification)

    return right({
      notification,
    })
  }
}
