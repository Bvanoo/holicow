export default interface IFirstLogin {
  lastname: string
  firstname: string
  denomination: string
  role: string
  adr_mail: string | null
  phone: string | null
  language: string
  links: string | null
  userId: number
  profilId: string
  country: string
  user_status: boolean
}
