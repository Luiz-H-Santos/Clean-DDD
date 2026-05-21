import { QuestionRepository } from '@/domain/forum/application/repositories/questions-repository.js'
import { Question } from '@/domain/forum/enterprise/entities/question.js'

export class InMemoryQuestionRepository implements QuestionRepository {
  public items: Question[] = []

  async findBySlug(slug: string) {
    const question = this.items.find((item) => item.slug.value === slug)

    if (!question) {
      return null
    }
    return question
  }

  async create(question: Question) {
    this.items.push(question)
  }
}
