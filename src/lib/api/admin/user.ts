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

import { PREFIX, headers } from "../vars"

export const searchUsers = async (page: number, limit: number, name?: string) => {
	return new Promise<User[]>((resolve, reject) => {
		fetch(PREFIX + `/admin/user/search?page=${page}&limit=${limit}${name ? `&name=${name}` : ''}`, {
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

export const updateUserAdmin = async (id: string, payload: unknown) => {
	return new Promise<{status: string}>((resolve, reject) => {
		fetch(PREFIX + `/admin/user/update`, {
			method: 'POST',
			headers,
			body: JSON.stringify({
				id,
				payload
			})
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

export const deleteUser = async (id: string) => {
	return new Promise<{status: string}>((resolve, reject) => {
		fetch(PREFIX + `/admin/user/delete`, {
			method: 'POST',
			headers,
			body: JSON.stringify({
				id
			})
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