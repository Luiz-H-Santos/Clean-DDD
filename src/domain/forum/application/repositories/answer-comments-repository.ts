import { AnswerComment } from '../../enterprise/entities/answer-comment.js'

export interface AnswerCommentRepository {
  create(answerComment: AnswerComment): Promise<void>
}
