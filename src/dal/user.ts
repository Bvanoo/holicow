import axios from 'axios'
import type Farmer from '../entities/farmer'
import type User from '@/entities/user'
import type ExistingUser from '@/entities/existingUser'

const userUrlApi = 'http://localhost:3000/users/first-login'

export default function useUsersDAL() {
  const getFirstLogin = async (profil_id: string): Promise<User | ExistingUser | void> => {
    return await axios
      .get(userUrlApi, {
        params: { profilId: profil_id },
      })
      .then((resp) => {
        return resp.data
      })
  }

  const updateUserProfile = async (farmer: Farmer): Promise<void> => {
    return await axios.post('localhost', farmer).then((resp) => {
      return resp.data
    })
  }

  return { getFirstLogin, updateUserProfile }
}
