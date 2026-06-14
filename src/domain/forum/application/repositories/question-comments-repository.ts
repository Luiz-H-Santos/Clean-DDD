import { QuestionComment } from '../../enterprise/entities/question-comment.js'

export interface QuestionCommentRepository {
  create(questionComment: QuestionComment): Promise<void>
}
