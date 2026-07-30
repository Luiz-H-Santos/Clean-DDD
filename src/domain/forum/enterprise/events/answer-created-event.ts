import { DomainEvent } from '@/core/events/domain-event.js'
import { Answer } from '../entities/answer.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'

export class AnswerCreatedEvent implements DomainEvent {
  public occurredAt: Date
  public answer: Answer

  constructor(answer: Answer) {
    this.answer = answer
    this.occurredAt = new Date()
  }

  getAggregateId(): UniqueEntityId {
    return this.answer.id
  }
}
