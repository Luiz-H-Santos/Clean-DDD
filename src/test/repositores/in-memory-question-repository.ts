import { QuestionRepository } from '@/domain/forum/application/repositories/question-repository.js'
import { Question } from '@/domain/forum/enterprise/entities/question.js'

export class InMemoryQuestionRepository implements QuestionRepository {
  public items: Question[] = []

  async create(question: Question) {
    this.items.push(question)
  }
}
