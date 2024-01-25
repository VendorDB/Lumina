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

export {}

declare global {
    interface User {
        _id: string;
        username: string;
        perms: number;
        email: string;
		profile_picture: string;
		about: string;
		totpEnabled?: boolean;
    }

    interface SignupValidator {
		[username: string]: {
			[charAmount: string]: boolean,
			[charTypes: string]: boolean,
			[noSpace: string]: boolean
		},
		[email: string]: {
			[valid: string]: boolean
		},
		[password: string]: {
			[charAmount: string]: boolean,
			[charTypes: string]: boolean,
			[noSpace: string]: boolean
			[match: string]: boolean
		},
        [dateOfBirth: string]: {
            [valid: string]: boolean
        }
	}

    interface SignupData {
        username: string,
        password: string,
        email: string,
        dateOfBirth: number,
    }

	interface VendorFilter {
		name?: string;
		description?: string;
		minAverageRating?: number;
		shippingTo?: string;
	}

	interface Vendor {
		_id: string;
		name: string;
		url: string;
		description: string;
		stars: number;
		reviewAmount: number;
		logo: string;
	}

	interface Review {
		_id: string;
		author: User;
		message: string;
		stars: number;
		created: number;
		likes: string[];
		likeAmount: number;
		vendor: string;
	}

	interface UserUpdate {
		profile_picture?: string;
		username?: string;
		about?: string;
	}

	interface VendorAddPayload {
		name: string;
		description: string;
		url: string;
		logo?: string;
		owner?: string;
	}

	interface VendorRequest {
		_id?: string;
		name: string;
		url: string;
		author?: {
			_id: string;
			username: string;
		},
		created?: number;
	}

	interface VendorReport {
		_id: string;
		reason: 'wrong-info' | 'fraud' | 'closed';
		message: string;
		author: {
			_id: string;
			username: string;
		}
		created: number;
	}

	interface VendorUpdatePayload {
		name?: string;
		description?: string;
		url?: string;
		logo?: string;
		owner?: string;
	}

}