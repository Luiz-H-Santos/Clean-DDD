import { InMemoryQuestionRepository } from '@/test/repositores/in-memory-question-repository.js'
import { makeQuestion } from '@/test/factories/make-question.js'
import { InMemoryQuestionCommentRepository } from '@/test/repositores/in-memory-question-comments-repository.js'
import { CommentOnQuestionUseCase } from './comment- on-question.js'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository
let sut: CommentOnQuestionUseCase

describe('Comment on Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
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
