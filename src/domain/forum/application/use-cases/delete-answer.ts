import { Either, left, right } from '@/core/either.js'
import { AnswersRepository } from '../repositories/answers-repository.js'
import { ResourceNotFoundError } from './errors/resource-not-found.js'
import { NotAllowedError } from './errors/not-allowed-error.js'

interface DeleteAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

type DeleteAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }
    await this.answerRepository.create(answer)

    return right(null)
  }
}
