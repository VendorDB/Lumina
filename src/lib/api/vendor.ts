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

export const getVendors = async (filter?: VendorFilter, page?: number, limit?: number) => {
	return new Promise<{
		vendors: Vendor[],
		page: number,
		limit: number,
		totalPages: number,
		totalCount: number
	}>((resolve, reject) => {
		fetch(PREFIX + `/vendor/search?page=${page || 1}&limit=${limit || 25}`, {
			method: 'POST',
			headers,
			body: JSON.stringify(filter || {})
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

export const getVendor = async (id: string) => {
	return new Promise<Vendor>((resolve, reject) => {
		fetch(PREFIX + `/vendor/${id}`, {
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

export const getReviews = async (id: string, page: number, limit: number, order: string, sort: string) => {
	return new Promise<Review[]>((resolve, reject) => {
		fetch(PREFIX + `/vendor/${id}/reviews?page=${page}&limit=${limit}&order=${order}&sort=${sort}`, {
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

export const postReview = async (id: string, message: string, stars: number) => {
	return new Promise<{isHeld?: boolean}>((resolve, reject) => {
		fetch(PREFIX + `/vendor/${id}/reviews`, {
			method: 'POST',
			headers,
			body: JSON.stringify({message, stars})
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

export const likeReview = async (vendor_id: string, review_id: string) => {
	return new Promise<{isHeld?: boolean}>((resolve, reject) => {
		fetch(PREFIX + `/vendor/${vendor_id}/reviews/${review_id}/like`, {
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

export const requestVendor = async (request: VendorRequest) => {
	return new Promise<{status: string}>((resolve, reject) => {
		fetch(PREFIX + `/vendor/request`, {
			method: 'POST',
			headers,
			body: JSON.stringify(request)
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

export const reportVendor = async (id: string, reason: string, message: string) => {
	return new Promise<{status: string}>((resolve, reject) => {
		fetch(PREFIX + `/vendor/${id}/report`, {
			method: 'POST',
			headers,
			body: JSON.stringify({
				reason,
				message
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