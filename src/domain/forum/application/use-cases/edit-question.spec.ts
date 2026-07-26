import { makeQuestion } from '@/test/factories/make-question.js'
import { InMemoryQuestionRepository } from '@/test/repositories/in-memory-question-repository.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { EditQuestionUseCase } from './edit-question.js'
import { NotAllowedError } from './errors/not-allowed-error.js'
import { InMemoryQuestionAttachmentRepository } from '@/test/repositories/in-memory-question-attachments-repository.js'
import { makeQuestionAttachment } from '@/test/factories/make-question-attachment.js'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentRepository()
    inMemoryQuestionRepository = new InMemoryQuestionRepository(
      inMemoryQuestionAttachmentsRepository,
    )

    sut = new EditQuestionUseCase(
      inMemoryQuestionRepository,
      inMemoryQuestionAttachmentsRepository,
    )
  })

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    )

    await inMemoryQuestionRepository.create(newQuestion)

    inMemoryQuestionAttachmentsRepository.items.push(
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityId('1'),
      }),
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityId('2'),
      }),
    )

    await sut.execute({
      questionId: newQuestion.id.toValue(),
      authorId: 'author-1',
      title: 'Pergunta teste',
      content: 'Conteúdo teste',
      attachmentsIds: ['1', '3'],
    })

    expect(inMemoryQuestionRepository.items[0]).toMatchObject({
      title: 'Pergunta teste',
      content: 'Conteúdo teste',
    })
    expect(
      inMemoryQuestionRepository.items[0]?.attachments.currentItems,
    ).toHaveLength(2)
    expect(
      inMemoryQuestionRepository.items[0]?.attachments.currentItems,
    ).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityId('3') }),
    ])
  })

  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    )

    await inMemoryQuestionRepository.create(newQuestion)

    const result = await sut.execute({
      questionId: newQuestion.id.toValue(),
      authorId: 'author-2',
      title: 'Pergunta teste',
      content: 'Conteúdo teste',
      attachmentsIds: [],
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
