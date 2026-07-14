import { Either, right } from '@/core/either.js'
import { QuestionComment } from '../../enterprise/entities/question-comment.js'
import { QuestionCommentRepository } from '../repositories/question-comments-repository.js'

interface FetchQuestionCommentsRequest {
  questionId: string
  page: number
}
type FetchQuestionCommentsResponse = Either<
  null,
  {
    questionComments: QuestionComment[]
  }
>

export class FetchQuestionCommentsUseCase {
  constructor(private questionCommentRepository: QuestionCommentRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionCommentsRequest): Promise<FetchQuestionCommentsResponse> {
    const questionComments =
      await this.questionCommentRepository.findManyByQuestionId(questionId, {
        page,
      })

    return right({
      questionComments,
    })
  }
}
