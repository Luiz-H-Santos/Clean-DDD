import { Question } from '../../enterprise/entities/question.js'

export interface QuestionRepository {
  create(question: Question): Promise<void>
}
