import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { QuestionRepository } from '../repositories/questions-repository.js'
import { Question } from '../../enterprise/entities/question.js'

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
}

interface createQuestionUseCaseResponse {
  question: Question
}

export class CreateQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    title,
    content,
  }: CreateQuestionUseCaseRequest): Promise<createQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      title,
      content,
    })

    await this.questionRepository.create(question)
    return {
      question,
    }
  }
}
