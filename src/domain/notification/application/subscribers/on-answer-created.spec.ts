import { makeAnswer } from '@/test/factories/make-answer.js'
import { OnAnswerCreated } from './on-answer-created.js'
import { InMemoryAnswerAttachmentRepository } from '@/test/repositories/in-memory-attachments-repository.js'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answer-repository.js'

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository

describe('On Answer Created', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
  })
  it('should send a notification when an answer is created', async () => {
    const onAnswerCreated = new OnAnswerCreated()
    const answer = makeAnswer()

    inMemoryAnswersRepository.create(answer)
  })
})
