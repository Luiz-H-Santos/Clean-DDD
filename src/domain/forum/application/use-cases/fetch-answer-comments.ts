import { Either, right } from '@/core/either.js'
import { AnswerComment } from '../../enterprise/entities/answer-comment.js'
import { AnswerCommentRepository } from '../repositories/answer-comments-repository.js'

interface FetchAnswerCommentsRequest {
  answerId: string
  page: number
}
type FetchAnswerCommentsResponse = Either<
  null,
  { answerComments: AnswerComment[] }
>

export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentRepository: AnswerCommentRepository) {}

  async execute({
    answerId,
    page,
  }: FetchAnswerCommentsRequest): Promise<FetchAnswerCommentsResponse> {
    const answerComments =
      await this.answerCommentRepository.findManyByAnswerId(answerId, {
        page,
      })

    return right({
      answerComments,
    })
  }
}
