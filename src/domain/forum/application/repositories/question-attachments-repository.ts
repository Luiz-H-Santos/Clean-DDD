import { QuestionAttachment } from '../../enterprise/entities/question-attachment.js'

export interface QuestionAttachmentRepository {
  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>
}
