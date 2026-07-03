import { InMemoryQuestionCommentRepository } from '@/test/repositores/in-memory-question-comments-repository.js'
import { DeleteQuestionCommentUseCase } from './delete-question-comment.js'
import { makeQuestionComment } from '@/test/factories/make-question-comments.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository
let sut: DeleteQuestionCommentUseCase

describe('Comment on Question', () => {
  beforeEach(() => {
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()

    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentRepository)
  })

  it('should be able to delete a question comment', async () => {
    const questionComment = makeQuestionComment()

    await inMemoryQuestionCommentRepository.create(questionComment)

    await sut.execute({
      questionCommentId: questionComment.id.toString(),
      authorId: questionComment.authorId.toString(),
    })
    expect(inMemoryQuestionCommentRepository.items).toHaveLength(0)
  })

  it('should be able to delete another user question comment', async () => {
    const questionComment = makeQuestionComment({
      authorId: new UniqueEntityId('author-1'),
    })

    await inMemoryQuestionCommentRepository.create(questionComment)

    expect(() => {
      return sut.execute({
        questionCommentId: questionComment.id.toString(),
        authorId: 'author-2',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
