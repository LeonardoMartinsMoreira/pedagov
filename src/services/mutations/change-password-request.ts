import { api } from '../api'

export interface ChangePasswordInput {
  password: string
  newPassword: string
  email: string
}

export async function changePasswordRequest(data: ChangePasswordInput) {
  return await api.post('/change-password', data)
}
