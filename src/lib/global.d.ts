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
        admin: boolean;
		moderator: boolean;
        email: string;
		profile_picture: string;
		about: string;
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
		description: string;
		stars: number;
		starsAverage: number;
		logo: string;
	}

	interface Review {
		author: User;
		message: string;
		stars: number;
	}

	interface UserUpdate {
		profile_picture?: string;
		username?: string;
		about?: string;
	}

}