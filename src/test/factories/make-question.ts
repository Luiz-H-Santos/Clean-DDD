import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question.js'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug.js'

export function makeQuestion(override: Partial<QuestionProps> = {}) {
  const question = Question.create({
    authorId: new UniqueEntityId(),
    title: 'Example question',
    slug: Slug.create('example-question'),
    content: 'Example content',
    ...override,
  })

  return question
}
