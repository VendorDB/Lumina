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


// Abbreviate long numbers (1k, 2.5m, etc)
// Slightly modified version of https://stackoverflow.com/a/2686098
export const abbreviateNumber = (number: number, decimals: number) => {

	if(number < 1000) {
		return number.toString()
	}

	let output = ''

	// 2 decimal places => 100, 3 => 1000, etc
	decimals = Math.pow(10, decimals);

	// Enumerate number abbreviations
	const abbrev = ["k", "m", "b", "t"];

	// Go through the array backwards, so we do the largest first
	for (let i = abbrev.length - 1; i >= 0; i--) {

		// Convert array index to "1000", "1000000", etc
		const size = Math.pow(10, (i + 1) * 3);

		// If the number is bigger or equal do the abbreviation
		if (size <= number) {
			// Here, we multiply by decimals, round, and then divide by decimals.
			// This gives us nice rounding to a particular decimal place.
			number = Math.round(number * decimals / size) / decimals;

			// Handle special case where we round up to the next abbreviation
			if ((number == 1000) && (i < abbrev.length - 1)) {
				number = 1;
				i++;
			}

			// Add the letter for the abbreviation
			output = `${number}${abbrev[i]}`

			// We are done... stop
			break;
		}
	}

	return output;
}