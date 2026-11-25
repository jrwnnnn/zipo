import { defineStore } from "pinia";
import { ref } from "vue";

import { characteristics } from "@/services/characteristics";

export const useZipoStore = defineStore("zipo", () => {
	const isArmed = ref(false);

	/**
	 * Arms the connected Zipo.
	 *
	 * @returns `true` if the command is sent successfully; otherwise, `false`.
	 */
	async function arm(): Promise<boolean> {
		const success = await characteristics.rxSend("ARM");

		if (!success) return false;

		isArmed.value = true;
		return true;
	}

	/**
	 * Disarms the connected Zipo.
	 *
	 * @returns `true` if the command is sent successfully; otherwise, `false`.
	 */
	async function unarm(): Promise<boolean> {
		const success = await characteristics.rxSend("DISARM");

		if (!success) return false;

		isArmed.value = false;
		return true;
	}

	/**
	 * Updates the client’s settings from the connected Zipo.
	 * Fired every connect/reconnect.
	 *
	 * @returns `true` if the command is sent successfully; otherwise, `false`.
	 */
	async function sync(): Promise<boolean> {
		const success = await characteristics.rxSend("SYNC");

		if (!success) return false;

		isArmed.value = false;
		return true;
	}

	return {
		isArmed,
		arm,
		unarm,
		sync,
	};
});
