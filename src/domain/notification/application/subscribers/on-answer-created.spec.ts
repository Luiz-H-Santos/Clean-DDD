import { makeAnswer } from '@/test/factories/make-answer.js'
import { OnAnswerCreated } from './on-answer-created.js'
import { InMemoryAnswerAttachmentRepository } from '@/test/repositories/in-memory-attachments-repository.js'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answer-repository.js'
import { InMemoryQuestionAttachmentRepository } from '@/test/repositories/in-memory-question-attachments-repository.js'
import { InMemoryQuestionRepository } from '@/test/repositories/in-memory-question-repository.js'
import { InMemoryNotificationRepository } from '@/test/repositories/in-memory-notification-repository.js'
import { SendNotificationUseCase, SendNotificationUseCaseRequest, SendNotificationUseCaseResponse } from '../use-cases/send-notification.js'
import { makeQuestion } from '@/test/factories/make-question.js'
import {MockInstance} from 'vitest'
import { waitFor } from '@/test/utils/wait-for.js'

let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository
let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentRepository
let inMemoryNotificationRepository: InMemoryNotificationRepository
let sendNotificationUseCase: SendNotificationUseCase
let sendNotificationExecuteSpy: MockInstance


describe('On Answer Created', () => {
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

    new OnAnswerCreated(inMemoryQuestionRepository, sendNotificationUseCase)
  })
  it('should send a notification when an answer is created', async () => {

    const question = makeQuestion()
    const answer = makeAnswer({questionId: question.id})

    inMemoryQuestionRepository.create(question)
    inMemoryAnswersRepository.create(answer)


    await waitFor(()=> {
    expect(sendNotificationExecuteSpy).toHaveBeenCalled()

    })
  })
})
