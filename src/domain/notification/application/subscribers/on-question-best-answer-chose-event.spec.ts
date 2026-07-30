import { makeAnswer } from '@/test/factories/make-answer.js'
import { InMemoryAnswerAttachmentRepository } from '@/test/repositories/in-memory-attachments-repository.js'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answer-repository.js'
import { InMemoryQuestionAttachmentRepository } from '@/test/repositories/in-memory-question-attachments-repository.js'
import { InMemoryQuestionRepository } from '@/test/repositories/in-memory-question-repository.js'
import { InMemoryNotificationRepository } from '@/test/repositories/in-memory-notification-repository.js'
import { SendNotificationUseCase } from '../use-cases/send-notification.js'
import { makeQuestion } from '@/test/factories/make-question.js'
import { MockInstance } from 'vitest'
import { waitFor } from '@/test/utils/wait-for.js'
import { OnQuestionBestAnswerChosen } from './on-question-best-answer-chose.js'

let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository
let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryNotificationRepository: InMemoryNotificationRepository
let sendNotificationUseCase: SendNotificationUseCase
let sendNotificationExecuteSpy: MockInstance

describe('On Question Best Answer Chosen', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentRepository =
      new InMemoryQuestionAttachmentRepository()
    inMemoryQuestionRepository = new InMemoryQuestionRepository(
      inMemoryQuestionAttachmentRepository,
    )
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    inMemoryNotificationRepository = new InMemoryNotificationRepository()
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationRepository,
    )

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnQuestionBestAnswerChosen(
      inMemoryAnswersRepository,
      sendNotificationUseCase,
    )
  })
  it('should send a notification when topic has new best answer chosen', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({ questionId: question.id })

    inMemoryQuestionRepository.create(question)
    inMemoryAnswersRepository.create(answer)

    question.bestAnswerId = answer.id
    inMemoryQuestionRepository.save(question)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})
