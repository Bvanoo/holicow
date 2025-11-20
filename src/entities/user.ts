import type UserType from './userType'

export default interface User extends UserType {
  profilId?: string
  firstname?: string
  lastname?: string
  country?: string
  user_status?: boolean
}
