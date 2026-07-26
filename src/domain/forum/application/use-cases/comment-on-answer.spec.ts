import { makeAnswer } from '@/test/factories/make-answer.js'
import { InMemoryAnswerCommentRepository } from '@/test/repositories/in-memory-answer-comments-repository.js'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answer-repository.js'
import { CommentOnAnswerUseCase } from './comment-on-answer.js'
import { InMemoryAnswerAttachmentRepository } from '@/test/repositories/in-memory-attachments-repository.js'

let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository
let inMemoryAnswerRepository: InMemoryAnswersRepository
let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository
let sut: CommentOnAnswerUseCase

describe('Comment on Answer', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentRepository =
      new InMemoryAnswerAttachmentRepository()

    inMemoryAnswerRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentRepository,
    )
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()

    sut = new CommentOnAnswerUseCase(
      inMemoryAnswerRepository,
      inMemoryAnswerCommentRepository,
    )
  })

  it('should be able to comment on answer', async () => {
    const answer = makeAnswer()

    await inMemoryAnswerRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: 'Comentário do teste',
    })
    expect(inMemoryAnswerCommentRepository.items[0]?.content).toEqual(
      'Comentário do teste',
    )
  })
})
