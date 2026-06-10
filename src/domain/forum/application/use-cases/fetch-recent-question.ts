import { Question } from '../../enterprise/entities/question.js'
import { QuestionRepository } from '../repositories/questions-repository.js'

interface FetchRecentQuestionsUseCaseRequest {
  page: number
}
interface FetchRecentQuestionsUseCaseResponse {
  questions: Question[]
}

export class FetchRecentQuestionsUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    page,
  }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {
    const questions = await this.questionRepository.findManyRecent({ page })

    return {
      questions,
    }
  }
}
