import { MissingParamError, InvalidParamError } from '../errors'
import { HttpResponse, HttpRequest, Controller } from '../protocols'
import { badRequest, serverEerror } from '../helpers/http-helper'
import { EmailValidator } from '../protocols/email-validator'
import { AddAccout } from '../../domain/usecases/add-account'
export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccout

  constructor (emailValidator: EmailValidator, addAccount: AddAccout) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const {name, email, password, passwordConfirmation } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      this.addAccount.add({
        name,
        email,
        password
      })
      return {
        statusCode: 200
      }
    } catch (error) {
      return serverEerror()
    }
  }
}
