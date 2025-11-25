import type IFirstLogin from './IFirstLogin'

export default interface IUserProfile extends IFirstLogin {
  region?: string
  bio?: boolean
  robot?: boolean
  mail_notif?: boolean
  adr_mail?: string
  phone_notif?: boolean
  phone?: string
}
