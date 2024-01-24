<!--
 Copyright (C) 2024 Marcus Huber (xenorio) <dev@xenorio.xyz>
 
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as
 published by the Free Software Foundation, either version 3 of the
 License, or (at your option) any later version.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.
 
 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
-->

<script lang="ts">
	import QRCode from "qrcode";
	import { onMount } from "svelte";

	export let style: string = "";

	let value: string;
	let dataUrl: string;

	export const update = () => {
		QRCode.toDataURL(value, (err, url) => {
			dataUrl = url
		})
	}

	export const set = (newValue: string) => {
		value = newValue
		update()
	}

	onMount(() => {
		update()
	})

</script>

{#if dataUrl}
	<img class="qrcode" {style} src={dataUrl} alt="QR Code">
{/if}

<style>
	.qrcode {
		border-radius: 25px;
	}
</style>