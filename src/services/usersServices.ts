import useUsersDAL from '@/dal/user'
import { checkUndefinedAndNullValue, showSimpleErrorBox } from '@/exception/utils'
import type User from '@/entities/user'
import { InvalidParameterException } from '@/exception/InvalidParameterException'
import type Farmer from '@/entities/farmer'

export default class UsersServices {
  private usersDAL = useUsersDAL()

  public async getFirstLogin(profil_id: string): Promise<User | void> {
    return await this.usersDAL
      .getFirstLogin(profil_id)
      .catch((err) => showSimpleErrorBox(new Date(), err.message, err.details))
  }
  public async getProfile(profil_id: string): Promise<Farmer | void> {
    return await this.usersDAL
      .getProfile(profil_id)
      .catch((err) => showSimpleErrorBox(new Date(), err.message, err.details))
  }

  public async updateUserProfile(profil_id: string, farmer: Farmer): Promise<void> {
    if (checkUndefinedAndNullValue(farmer)) {
      throw new InvalidParameterException('farmer Object cannot be null or undefined')
    }
    return await this.usersDAL
      .updateUserProfile(profil_id, farmer)
      .catch((err) => showSimpleErrorBox(new Date(), err.message, err.details))
  }
}
