export default interface IUserProfile {
  profilId: string
  lastname: string
  firstname: string
  country: string
  user_status: boolean
  type: string
  region: string
  bio: boolean
  robot: boolean
  mail_notif: boolean
  adr_mail?: string
  phone_notif: boolean
  phone?: string
  avatar_picture: string
  //Utile uniquement pour l'admin
  //A DEMANDER AU BACK, utiliser "role" au lieu de "type" dans le dto du farmer ?
  role?: string
  // region: string
  // bio: boolean
  // robot: boolean
  // mail_notif: boolean
  // adr_mail?: string
  // phone_notif: boolean
  // phone?: string
  // avatar_picture: string
}
