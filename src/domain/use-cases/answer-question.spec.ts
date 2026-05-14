import { AnswerQuestionUseCase } from './answer-questions.js'
import { AnswersRepository } from '../repositories/answers-repository.js'
import { Answer } from '../entities/answer.js'

const fakeAnswerRepository: AnswersRepository = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create: async (_answer: Answer) => {},
}
test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository)

  const answer = await answerQuestion.execute({
    questionId: '1',
    instructorId: '1',
    content: 'Nova resposta',
  })

  expect(answer.content).toEqual('Nova resposta')
})
