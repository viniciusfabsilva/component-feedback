import { SubmitFeedbackUseCase } from './submit-feedback-use-case';

const createFeedbackSpy = jest.fn();

const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,asd0as0das00',
    })).resolves.not.toThrow(); /* Esperando que a função chegue até o final e não dispare ero */
  
    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  }); /* Teste unitário tem que testar caso de uso desconectado de dep*/

  it('should not be able to post feedback without type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,asd0as0das00',
    })).rejects.toThrow(); /* Esperando que a função chegue até o final e não dispare ero */
  });
  
  it('should not be able to post feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,asd0as0das00',
    })).rejects.toThrow(); 
  });

  it('should not be able to post feedback without screenshot', async () => {
    await expect(submitFeedback.execute({
      type: 'bug',
      comment: 'example comment',
      screenshot: 'test.jpg',
    })).rejects.toThrow(); 
  });

});