import { Question } from '../../enterprise/entities/question.js'

export interface QuestionRepository {
  findBySlug(slug: string): Promise<Question | null>
  create(question: Question): Promise<void>
}
