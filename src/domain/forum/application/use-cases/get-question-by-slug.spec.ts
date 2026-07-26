import { InMemoryQuestionRepository } from '@/test/repositores/in-memory-question-repository.js'
import { GetQuestionBySlug } from './get-question-by-slug.js'
import { makeQuestion } from '@/test/factories/make-question.js'
import { Slug } from '../../enterprise/entities/value-objects/slug.js'
import { InMemoryQuestionAttachmentRepository } from '@/test/repositores/in-memory-question-attachments-repository.js'

let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository
let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: GetQuestionBySlug

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentRepository =
      new InMemoryQuestionAttachmentRepository()
    inMemoryQuestionRepository = new InMemoryQuestionRepository(
      inMemoryQuestionAttachmentRepository,
    )
    sut = new GetQuestionBySlug(inMemoryQuestionRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('example-question'),
    })
    await inMemoryQuestionRepository.create(newQuestion)

    const result = await sut.execute({
      slug: 'example-question',
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(result.value.question).toBeTruthy()
      expect(result.value.question.title).toEqual(newQuestion.title)
    }
  })
})
