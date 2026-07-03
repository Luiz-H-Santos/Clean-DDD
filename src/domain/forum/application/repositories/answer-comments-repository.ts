import { PaginationParams } from '@/core/repositories/pagination-params.js'
import { AnswerComment } from '../../enterprise/entities/answer-comment.js'

export interface AnswerCommentRepository {
  findById(id: string): Promise<AnswerComment | null>
  findManyByAnswerId(
    questionId: string,
    params: PaginationParams,
  ): Promise<AnswerComment[]>
  create(answerComment: AnswerComment): Promise<void>
  delete(answerComment: AnswerComment): Promise<void>
}
