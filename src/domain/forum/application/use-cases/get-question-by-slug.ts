import { QuestionRepository } from '../repositories/questions-repository.js'
import { Question } from '../../enterprise/entities/question.js'
import { Either, left, right } from '@/core/either.js'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found.js'

interface GetQuestionBySlugUseCaseRequest {
  slug: string
}
type GetQuestionBySlugUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    question: Question
  }
>

export class GetQuestionBySlug {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionRepository.findBySlug(slug)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    return right({
      question,
    })
  }
}
