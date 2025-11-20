import type Farmer from './farmer'
import type UserType from './userType'

export default interface User extends UserType {
  profilId: string
  userId: number
  lastname: string
  firstname: string
  denomination: string
  role: string
  email: string
  mobile: string
  language: string
  links: string
  country: string
  user_status: boolean
  farmer: Farmer
}
