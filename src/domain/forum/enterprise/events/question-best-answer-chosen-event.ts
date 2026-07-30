import { DomainEvent } from '@/core/events/domain-event.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { Question } from '../entities/question.js'

export class QuestionBestAnswerChoseEvent implements DomainEvent {
  public occurredAt: Date
  public question: Question
  public bestAnswerId: UniqueEntityId

  constructor(question: Question, bestAnswerId: UniqueEntityId) {
    this.question = question
    this.bestAnswerId = bestAnswerId
    this.occurredAt = new Date()
  }

  getAggregateId(): UniqueEntityId {
    return this.question.id
  }
}
