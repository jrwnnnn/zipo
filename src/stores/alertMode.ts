import { defineStore } from "pinia";
import { ref } from "vue";

import { characteristics } from "@/services/characteristics";

export type AlertMode = "full" | "phone" | "zipo";

export const useAlertModeStore = defineStore("alert mode", () => {
	const mode = ref<AlertMode>("full");

	/**
	 * Sends the selected alert mode to the connected Zipo and
	 * updates local state on success.
	 *
	 * @param m - Alert mode to activate.
	 */
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
