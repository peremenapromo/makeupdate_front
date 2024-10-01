import { instance } from '../api/api'
import { IResponseUserData, IUser, IUserData } from '../type/type'

export const AuthService = {
	async registration(
		userData: IUserData
	): Promise<IResponseUserData | undefined> {
		const { data } = await instance.post<
			IUserData,
			{ data: IResponseUserData }
		>('api/v1/auth/users/', userData)
		return data
	},
	async login(userData: IResponseUserData): Promise<IUser | undefined> {
		const { data } = await instance.post<IUser>('api/v1/token/', userData)
		return data
	},
}
