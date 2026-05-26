import { InMemoryQuestionRepository } from '@/test/repositores/in-memory-question-repository.js'
import { GetQuestionBySlug } from './get-question-by-slug.js'
import { makeQuestion } from '@/test/factories/make-question.js'
import { Slug } from '../../enterprise/entities/value-objects/slug.js'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: GetQuestionBySlug

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new GetQuestionBySlug(inMemoryQuestionRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('example-question'),
    })
    await inMemoryQuestionRepository.create(newQuestion)

    const { question } = await sut.execute({
      slug: 'example-question',
    })

    expect(question).toBeTruthy()
    expect(newQuestion.title).toEqual(newQuestion.title)
  })
})
