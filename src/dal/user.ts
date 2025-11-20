import axios from 'axios'
import type Farmer from '../entities/farmer'
import type User from '@/entities/user'
import type ExistingUser from '@/entities/existingUser'

export default function useUsersDAL() {
  const getFirstLogin = async (): Promise<User | ExistingUser | void> => {
    return await axios.get('localhost').then((resp) => {
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
