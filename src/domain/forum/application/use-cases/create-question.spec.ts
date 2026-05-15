import { CreateQuestionUseCase } from './create-question.js'
import { InMemoryQuestionRepository } from '@/test/repositores/in-memory-question-repository.js'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: CreateQuestionUseCase

describe('create a question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionRepository)
  })

  it('should be able to create a question', async () => {
    const { question } = await sut.execute({
      authorId: '1',
      title: 'new question',
      content: 'content of the question',
    })

    expect(question).toBeTruthy()
    expect(inMemoryQuestionRepository.items[0]?.id).toEqual(question.id)
  })
})
