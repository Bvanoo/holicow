import useUsersDAL from '@/dal/user'
import { checkUndefinedAndNullValue, showSimpleErrorBox } from '@/exception/utils'
import { InvalidParameterException } from '@/exception/InvalidParameterException'
import type IFirstLogin from '@/entities/IFirstLogin'
import type IUserProfile from '@/entities/IUserProfile'

export default class UsersServices {
  private usersDAL = useUsersDAL()

  public async getFirstLogin(profil_id: string): Promise<IFirstLogin | void> {
    return await this.usersDAL
      .getFirstLogin(profil_id)
      .catch((err) => showSimpleErrorBox(new Date(), err.message, err.details))
  }
  public async getProfile(profil_id: string): Promise<IUserProfile | void> {
    return await this.usersDAL
      .getProfile(profil_id)
      .catch((err) => showSimpleErrorBox(new Date(), err.message, err.details))
  }

  public async updateUserProfile(profil_id: string, userProfile: IUserProfile): Promise<void> {
    if (checkUndefinedAndNullValue(userProfile)) {
      throw new InvalidParameterException('farmer Object cannot be null or undefined')
    }
    return await this.usersDAL
      .updateUserProfile(profil_id, userProfile)
      .catch((err) => showSimpleErrorBox(new Date(), err.message, err.details))
  }
}
