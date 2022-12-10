import { MissingParamError } from '../errors/missing-param-error'
import { HttpRequest } from '../protocols/http'
import { SignUpController } from './signup'
describe('Signup Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const sut = new SignUpController()
    const httpRequest: HttpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpRespose = sut.handle(httpRequest)
    expect(httpRespose.statusCode).toBe(400)
    expect(httpRespose.body).toEqual(new MissingParamError('name'))
  })
  test('Should return 400 if no email is provided', () => {
    const sut = new SignUpController()
    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpRespose = sut.handle(httpRequest)
    expect(httpRespose.statusCode).toBe(400)
    expect(httpRespose.body).toEqual(new MissingParamError('email'))
  })
})
