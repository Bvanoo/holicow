import useUsersDAL from '@/dal/user'
import { checkUndefinedAndNullValue, showSimpleErrorBox } from '@/domain/exception/utils'
import type User from '@/domain/entities/user'
import { InvalidParameterException } from '@/domain/exception/InvalidParameterException'

export default class UsersServices {
  private usersDAL = useUsersDAL()

  public async getFirstLogin(profil_id: string): Promise<User | void> {
    return await this.usersDAL
      .getFirstLogin(profil_id)
      .catch((err) => showSimpleErrorBox(new Date(), err.message, err.details))
  }

  public async updateUserProfile(farmer: User): Promise<void> {
    if (checkUndefinedAndNullValue(farmer)) {
      throw new InvalidParameterException('farmer Object cannot be null or undefined')
    }
    return await this.usersDAL
      .updateUserProfile(farmer)
      .catch((err) => showSimpleErrorBox(new Date(), err.message, err.details))
  }
}
