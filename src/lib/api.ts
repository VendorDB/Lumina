// Copyright (C) 2023 Marcus Huber (xenorio) <dev@xenorio.xyz>
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

const PREFIX = "http://localhost:3000/api/v1"

const headers = {
    'content-type': 'application/json'
}

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

export const login = async (email: string, password: string) => {
    return new Promise<{
        status: string,
        user: User
    }>((resolve, reject) => {
        fetch(PREFIX + '/user/login', {
            method: 'POST',
            headers,
            body: JSON.stringify({
                email,
                password
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