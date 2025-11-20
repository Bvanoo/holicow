import type UserType from './userType'

export default interface User extends UserType {
  profil_id?: string
  first_name?: string
  last_name?: string
  country?: string
  user_status?: string
}
