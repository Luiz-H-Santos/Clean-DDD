import { InMemoryQuestionRepository } from '@/test/repositores/in-memory-question-repository.js'
import { makeQuestion } from '@/test/factories/make-question.js'
import { InMemoryQuestionCommentRepository } from '@/test/repositores/in-memory-question-comments-repository.js'
import { CommentOnQuestionUseCase } from './comment-on-question.js'
import { InMemoryQuestionAttachmentRepository } from '@/test/repositores/in-memory-question-attachments-repository.js'

let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository
let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository
let sut: CommentOnQuestionUseCase

describe('Comment on Question', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentRepository =
      new InMemoryQuestionAttachmentRepository()

    inMemoryQuestionRepository = new InMemoryQuestionRepository(
      inMemoryQuestionAttachmentRepository,
    )
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()

    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionRepository,
      inMemoryQuestionCommentRepository,
    )
  })

  it('should be able to comment on question', async () => {
    const question = makeQuestion()

    await inMemoryQuestionRepository.create(question)

    await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: 'Comentário do teste',
    })
    expect(inMemoryQuestionCommentRepository.items[0]?.content).toEqual(
      'Comentário do teste',
    )
  })
})
