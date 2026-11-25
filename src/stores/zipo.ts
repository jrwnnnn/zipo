import { defineStore } from "pinia";
import { ref } from "vue";

import { characteristics } from "@/services/characteristics";

export const useZipoStore = defineStore("zipo", () => {
	const isArmed = ref(false);

	async function arm(): Promise<boolean> {
		const success = await characteristics.rxSend("ARM");

		if (!success) return false;

		isArmed.value = true;
		return true;
	}

	async function unarm(): Promise<boolean> {
		const success = await characteristics.rxSend("DISARM");

		if (!success) return false;

		isArmed.value = false;
		return true;
	}

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
