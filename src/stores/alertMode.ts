import { defineStore } from "pinia";
import { ref } from "vue";

import { characteristics } from "@/services/characteristics";

export type AlertMode = "full" | "phone" | "zipo";

export const useAlertModeStore = defineStore("alert mode", () => {
	const mode = ref<AlertMode>("full");

	async function switchMode(m: AlertMode): Promise<void> {
		const success = await characteristics.rxSend(`MODE.${m.toUpperCase()}`);

		if (!success) return;

		mode.value = m;
		return;
	}

	return {
		mode,
		switchMode,
	};
});
