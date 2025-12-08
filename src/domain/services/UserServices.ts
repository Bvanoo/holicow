import useUsersDAL from '@/dal/user'
import { checkUndefinedAndNullValue, showSimpleErrorBox } from '@/domain/exception/utils'
import { InvalidParameterException } from '@/domain/exception/InvalidParameterException'
import type IUserProfile from '@/domain/entities/IUserProfile'
import type updateProfile from '../entities/updateProfile'
import type IFirstLoginPayload from '../entities/IFirstLoginPayload'

export default class UsersServices {
  private usersDAL = useUsersDAL()

  public async getFirstLogin(profil_id: string): Promise<IFirstLoginPayload | void> {
    return await this.usersDAL
      .getFirstLogin(profil_id)
      .catch((err) => showSimpleErrorBox(new Date(), err.message, err.details))
  }
  public async getProfile(profil_id: string): Promise<IUserProfile | void> {
    return await this.usersDAL
      .getProfile(profil_id)
      .catch((err) => showSimpleErrorBox(new Date(), err.message, err.details))
  }

  public async updateUserProfile(profil_id: string, userProfile: updateProfile): Promise<void> {
    if (checkUndefinedAndNullValue(userProfile)) {
      throw new InvalidParameterException('farmer Object cannot be null or undefined')
    }
    return await this.usersDAL
      .updateUserProfile(profil_id, userProfile)
      .catch((err) => showSimpleErrorBox(new Date(), err.message, err.details))
  }
}
