import type IFirstLogin from './IFirstLogin'

export default interface IFirstLoginPayload {
  token: string
  user: IFirstLogin
}
