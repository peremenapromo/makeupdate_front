export async function getTokenFromSessionStorage(): Promise<string> {
	try {
		const data = sessionStorage.getItem('token')
		return data ? JSON.parse(data) : ''
	} catch (error) {
		console.error('Error getting token from sessionStorage:', error)
		return ''
	}
}

export async function setTokenToSessionStorage(
	key: string,
	token: string
): Promise<void> {
	try {
		sessionStorage.setItem(key, JSON.stringify(token))
	} catch (error) {
		console.error('Error setting token to sessionStorage:', error)
	}
}

export async function removeTokenFromSessionStorage(
	key: string
): Promise<void> {
	try {
		sessionStorage.removeItem(key)
	} catch (error) {
		console.error('Error removing token from sessionStorage:', error)
	}
}
