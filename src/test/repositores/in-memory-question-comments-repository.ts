import { QuestionCommentRepository } from '@/domain/forum/application/repositories/question-comments-repository.js'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment.js'

export class InMemoryQuestionCommentRepository implements QuestionCommentRepository {
  public items: QuestionComment[] = []

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }
}
