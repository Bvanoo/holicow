import axios from 'axios'
import type User from '@/entities/user'
import type Farmer from '@/entities/farmer'

const userUrlApi = 'http://localhost:3000'

export default function useUsersDAL() {
  const getFirstLogin = async (profil_id: string): Promise<User | void> => {
    return await axios
      .get(`${userUrlApi}/users/first-login`, {
        params: { profilId: profil_id },
      })
      .then((resp) => {
        return resp.data
      })
  }

  const getProfile = async (profil_id: string): Promise<Farmer | void> => {
    return await axios.get(`${userUrlApi}/profile/${profil_id}`).then((resp) => {
      return resp.data
    })
  }

  const updateUserProfile = async (profil_id: string, farmer: Farmer): Promise<void> => {
    return await axios.put(`${userUrlApi}/profile/update/${profil_id}`, farmer).then((resp) => {
      return resp.data
    })
  }

  return { getFirstLogin, getProfile, updateUserProfile }
}
