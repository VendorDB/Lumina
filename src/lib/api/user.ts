// Copyright (C) 2024 Marcus Huber (xenorio) <dev@xenorio.xyz>
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// 
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import { PREFIX, headers } from "./vars"

export const fetchMe = async () => {
	return new Promise<User>((resolve, reject) => {
		fetch(PREFIX + '/user/me')
			.then(async (res) => {
				if (res.status == 200) {
					resolve(await res.json())
				} else {
					reject(await res.json())
				}
			})
	})
}

export const register = async (data: SignupData) => {
	return new Promise<void>((resolve, reject) => {
		fetch(PREFIX + '/user/create', {
			method: 'POST',
			headers,
			body: JSON.stringify(data)
		})
			.then(async res => {
				if (res.status == 200) {
					resolve()
				} else {
					reject(await res.json())
				}
			})
	})
}

export const resendVerification = async (email: string) => {
	return new Promise<void>((resolve, reject) => {
		fetch(PREFIX + '/user/resend-verification', {
			method: 'POST',
			headers,
			body: JSON.stringify({
				email
			})
		})
			.then(async res => {
				if (res.status == 200) {
					resolve()
				} else {
					reject(await res.json())
				}
			})
	})
}

export const verifyMail = async (code: string) => {
	return new Promise<void>((resolve, reject) => {
		fetch(PREFIX + '/user/verify', {
			method: 'POST',
			headers,
			body: JSON.stringify({
				code
			})
		})
			.then(async res => {
				if (res.status == 200) {
					resolve()
				} else {
					reject(await res.json())
				}
			})
	})
}

export const login = async (email: string, password: string, totpToken?: string) => {
	return new Promise<{
		status: string,
		user: User
	}>((resolve, reject) => {
		fetch(PREFIX + '/user/login', {
			method: 'POST',
			headers,
			body: JSON.stringify({
				email,
				password,
				totp: totpToken
			})
		})
			.then(async (res) => {
				if (res.status == 200) {
					resolve(await res.json())
				} else {
					reject(await res.json())
				}
			})
	})
}

export const logout = async () => {
	return new Promise<void>((resolve, reject) => {
		fetch(PREFIX + '/user/logout', {
			method: 'POST'
		})
			.then(async res => {
				if (res.status == 200) {
					resolve()
				} else {
					reject(await res.json())
				}
			})
	})
}

export const getProfilePicture = async (id: string) => {
	return new Promise<{status: string, picture: string}>((resolve, reject) => {
		fetch(PREFIX + `/user/${id}/profile-picture`, {
			method: 'GET',
			headers
		})
			.then(async res => {
				if (res.status == 200) {
					resolve(await res.json())
				} else {
					reject(await res.json())
				}
			})
	})
}

export const getUserReviews = async (id: string) => {
	return new Promise<Review[]>((resolve, reject) => {
		fetch(PREFIX + `/user/${id}/reviews`, {
			method: 'GET',
			headers
		})
			.then(async res => {
				if (res.status == 200) {
					resolve(await res.json())
				} else {
					reject(await res.json())
				}
			})
	})
}

export const updateUser = async (update: UserUpdate) => {
	return new Promise<void>((resolve, reject) => {
		fetch(PREFIX + '/user/update', {
			method: 'POST',
			headers,
			body: JSON.stringify(update)
		})
			.then(async res => {
				if (res.status == 200) {
					resolve(await res.json())
				} else {
					reject(await res.json())
				}
			})
	})
}

export const deleteAccount = async () => {
	return new Promise<void>((resolve, reject) => {
		fetch(PREFIX + '/user/delete-account', {
			method: 'GET',
			headers
		})
			.then(async res => {
				if (res.status == 200) {
					resolve(await res.json())
				} else {
					reject(await res.json())
				}
			})
	})
}

export const getProfile = async (id: string) => {
	return new Promise<User>((resolve, reject) => {
		fetch(PREFIX + `/user/${id}/profile`, {
			method: 'GET',
			headers
		})
			.then(async res => {
				if (res.status == 200) {
					resolve(await res.json())
				} else {
					reject(await res.json())
				}
			})
	})
}