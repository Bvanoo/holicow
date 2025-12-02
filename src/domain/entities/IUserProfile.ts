export default interface IUserProfile {
  region: string
  bio: boolean
  robot: boolean
  mail_notif: boolean
  adr_mail?: string
  phone_notif: boolean
  phone?: string
  avatar_picture: string
}
