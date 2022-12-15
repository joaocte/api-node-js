import { AccountModel } from '../mdoels/account'

export interface AddAccountModel {
  name: string
  email: string
  password: string
}
export interface AddAccout {
  add (account: AddAccountModel): AccountModel
}
