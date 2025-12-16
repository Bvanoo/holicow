import type UserType from './userType'

export default interface IUser extends UserType {
  profilId: string
  lastname: string
  firstname: string
  country: string
  type: string
  adr_mail: string
  phone: string
  region: string
  bio: boolean
  robot: boolean
  mail_notif: boolean
  phone_notif: boolean
  user_status: boolean
}
