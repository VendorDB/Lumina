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

export const createVendor = async (data: VendorAddPayload) => {
	return new Promise<{status: string, id: string}>((resolve, reject) => {
		fetch(PREFIX + `/admin/vendor/create`, {
			method: 'POST',
			headers,
			body: JSON.stringify(data)
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

export const updateVendor = async (id: string, payload: VendorUpdatePayload) => {
	return new Promise<{status: string,}>((resolve, reject) => {
		fetch(PREFIX + `/admin/vendor/update`, {
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

export const deleteVendor = async (id: string) => {
	return new Promise<void>((resolve, reject) => {
		fetch(PREFIX + `/admin/vendor/remove`, {
			method: 'POST',
			headers,
			body: JSON.stringify({id})
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

export const getVendorRequests = async (page: number, limit: number) => {
	return new Promise<VendorRequest[]>((resolve, reject) => {
		fetch(PREFIX + `/admin/vendor/requests?page=${page}&limit=${limit}`, {
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

export const deleteVendorRequest = async (id: string) => {
	return new Promise<{status: string}>((resolve, reject) => {
		fetch(PREFIX + `/admin/vendor/delete-request`, {
			method: 'POST',
			headers,
			body: JSON.stringify({id})
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

export const deleteVendorReport = async (id: string) => {
	return new Promise<{status: string}>((resolve, reject) => {
		fetch(PREFIX + `/admin/vendor/delete-report`, {
			method: 'POST',
			headers,
			body: JSON.stringify({id})
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

export const getVendorReports = async (page: number, limit: number) => {
	return new Promise<VendorReport[]>((resolve, reject) => {
		fetch(PREFIX + `/admin/vendor/reports?page=${page}&limit=${limit}`, {
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