export default class User {
  //Dès que les variables sont en privés, impossible d'y accéder car on perd le contexte
  id: number = 0
  mail: string = 'John.Doe@gmail.com'
  phone: string = '0032499999999'
  userStatus: string = 'Novice'

  constructor(id: number, mail: string, phone: string, user_status: string) {
    this.id = id
    this.mail = mail
    this.phone = phone
    this.userStatus = user_status
  }

  getId(): number {
    return this.id
  }
  getPhone(): string {
    return this.phone
  }
  getMail(): string {
    return this.mail
  }
  getUserStatus(): string {
    return this.userStatus
  }

  setId(newId: number) {
    this.id = newId
  }
  setPhone(newPhone: string) {
    this.phone = newPhone
  }
  setMail(newMail: string) {
    this.mail = newMail
  }
  setUserStatus(userStatus: string) {
    this.userStatus = userStatus
  }
}
