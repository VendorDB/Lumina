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

export const listReportedReviews = async (page: number, limit: number) => {
	return new Promise<Review[]>((resolve, reject) => {
		fetch(PREFIX + `/moderator/review/list-reported?page=${page}&limit=${limit}`, {
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

export const unreportReview = async (id: string) => {
	return new Promise<{status: string}>((resolve, reject) => {
		fetch(PREFIX + `/moderator/review/unreport`, {
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

export const listHeldReviews = async (page: number, limit: number) => {
	return new Promise<Review[]>((resolve, reject) => {
		fetch(PREFIX + `/moderator/review/list-held?page=${page}&limit=${limit}`, {
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

export const unholdReview = async (id: string, action: 'ACCEPT' | 'DENY') => {
	return new Promise<{status: string}>((resolve, reject) => {
		fetch(PREFIX + `/moderator/review/unhold`, {
			method: 'POST',
			headers,
			body: JSON.stringify({
				id,
				action
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

export const deleteReview = async (id: string) => {
	return new Promise<{status: string}>((resolve, reject) => {
		fetch(PREFIX + `/moderator/review/delete`, {
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