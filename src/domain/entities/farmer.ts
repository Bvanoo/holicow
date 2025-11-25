import type User from '../user'

export default interface Farmer extends User {
  region?: string
  bio?: boolean
  robot?: boolean
  adr_mail?: string
  phone?: string
  notif_mail?: boolean
  notif_phone?: boolean
}
