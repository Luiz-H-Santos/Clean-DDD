import { QuestionRepository } from '../repositories/question-repository.js'
import { Question } from '../../enterprise/entities/question.js'
import { CreateQuestionUseCase } from './create-question.js'

const fakeQuestionRepository: QuestionRepository = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create: async (question: Question) => {},
}
test('create a question', async () => {
  const createQuestion = new CreateQuestionUseCase(fakeQuestionRepository)

  const { question } = await createQuestion.execute({
    authorId: '1',
    title: 'new question',
    content: 'content of the question',
  })

  expect(question).toBeTruthy()
})
