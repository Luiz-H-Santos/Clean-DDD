import { PaginationParams } from '@/core/repositories/pagination-params.js'
import { AnswerCommentRepository } from '@/domain/forum/application/repositories/answer-comments-repository.js'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment.js'

export class InMemoryAnswerCommentRepository implements AnswerCommentRepository {
  public items: AnswerComment[] = []

  async findById(id: string) {
    const answerComment = this.items.find((item) => item.id.toString() === id)

    if (!answerComment) {
      return null
    }
    return answerComment
  }

  async findManyByAnswerId(answerId: string, { page }: PaginationParams) {
    const answersComments = this.items
      .filter((item) => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20)

    return answersComments
  }

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }

  async delete(answerComment: AnswerComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === answerComment.id,
    )

    this.items.splice(itemIndex, 1)
  }
}
