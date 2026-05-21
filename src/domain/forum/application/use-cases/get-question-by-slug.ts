import { QuestionRepository } from '../repositories/questions-repository.js'
import { Question } from '../../enterprise/entities/question.js'

interface GetQuestionBySlugUseCaseRequest {
  slug: string
}
interface GetQuestionBySlugUseCaseResponse {
  question: Question
}

export class GetQuestionBySlug {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionRepository.findBySlug(slug)

    if (!question) {
      throw new Error('Question not found')
    }

    return {
      question,
    }
  }
}
