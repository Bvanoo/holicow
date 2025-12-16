import axios from 'axios'
import type IUserProfile from '@/domain/entities/IUserProfile'
import type updateProfile from '@/domain/entities/updateProfile'
import type IFirstLoginPayload from '@/domain/entities/IFirstLoginPayload'
const userUrlApi = 'http://localhost:3000'

export default function useUsersDAL() {
  const getFirstLogin = async (profil_id: string): Promise<IFirstLoginPayload | void> => {
    return await axios
      .get(`${userUrlApi}/users/firstLogin`, {
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

  const updateUserProfile = async (
    profil_id: string,
    userProfile: updateProfile,
  ): Promise<void> => {
    return await axios
      .put(`${userUrlApi}/profile/update/${profil_id}`, userProfile)
      .then((resp) => {
        return resp.data
      })
  }

  return { getFirstLogin, getProfile, updateUserProfile }
}
