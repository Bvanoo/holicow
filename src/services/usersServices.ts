import useUsersDAL from '@/dal/user'
import { checkUndefinedAndNullValue, showSimpleErrorBox } from '@/exception/utils'
import type ExistingUser from '@/entities/existingUser'
import type User from '@/entities/user'
import type Farmer from '@/entities/farmer'
import { InvalidParameterException } from '@/exception/InvalidParameterException'

export default class UsersServices {
  private usersDAL = useUsersDAL()

  public async getFirstLogin(profil_id: string): Promise<User | ExistingUser | void> {
    return await this.usersDAL
      .getFirstLogin(profil_id)
      .catch((err) => showSimpleErrorBox(new Date(), err.message, err.details))
  }

  public async updateUserProfile(farmer: Farmer): Promise<void> {
    if (checkUndefinedAndNullValue(farmer)) {
      throw new InvalidParameterException('farmer Object cannot be null or undefined')
    }
    return await this.usersDAL
      .updateUserProfile(farmer)
      .catch((err) => showSimpleErrorBox(new Date(), err.message, err.details))
  }
}
