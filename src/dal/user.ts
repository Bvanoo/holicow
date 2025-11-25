import axios from 'axios'
import type IFirstLogin from '@/entities/IFirstLogin'
import type IUserProfile from '@/entities/IUserProfile'

const userUrlApi = 'http://localhost:3000'

export default function useUsersDAL() {
  const getFirstLogin = async (profil_id: string): Promise<IFirstLogin | void> => {
    return await axios
      .get(`${userUrlApi}/users/first-login`, {
        params: { profilId: profil_id },
      })
      .then((resp) => {
        return resp.data
      })
  }

  const getProfile = async (profil_id: string): Promise<IUserProfile | void> => {
    return await axios.get(`${userUrlApi}/profile/${profil_id}`).then((resp) => {
      return resp.data
    })
  }

  const updateUserProfile = async (profil_id: string, userProfile: IUserProfile): Promise<void> => {
    return await axios
      .put(`${userUrlApi}/profile/update/${profil_id}`, userProfile)
      .then((resp) => {
        return resp.data
      })
  }

  return { getFirstLogin, getProfile, updateUserProfile }
}
