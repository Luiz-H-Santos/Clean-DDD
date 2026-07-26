import { Either, left, right } from '@/core/either.js'
import { QuestionRepository } from '../repositories/questions-repository.js'
import { NotAllowedError } from './errors/not-allowed-error.js'
import { ResourceNotFoundError } from './errors/resource-not-found.js'
import { QuestionAttachmentRepository } from '../repositories/question-attachments-repository.js'
import { QuestionAttachmentList } from '../../enterprise/entities/question-attachment-list.js'
import { QuestionAttachment } from '../../enterprise/entities/question-attachment.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'

interface EditQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
  attachmentsIds: string[]
}

type EditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

export class EditQuestionUseCase {
  constructor(
    private questionRepository: QuestionRepository,
    private questionAttachmentsRepository: QuestionAttachmentRepository,
  ) {}

  async execute({
    questionId,
    authorId,
    title,
    content,
    attachmentsIds,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    const currentQuestionAttachments =
      await this.questionAttachmentsRepository.findManyByQuestionId(questionId)

    const questionAttachmentList = new QuestionAttachmentList(
      currentQuestionAttachments,
    )

    const questionAttachments = attachmentsIds.map((attachmentId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        questionId: question.id,
      })
    })

    questionAttachmentList.update(questionAttachments)

    question.attachments = questionAttachmentList
    question.title = title
    question.content = content
    await this.questionRepository.save(question)

    return right(null)
  }
}
