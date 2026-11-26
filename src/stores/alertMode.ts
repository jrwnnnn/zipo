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
		try {
			await characteristics.rxSend(`MODE.${m.toUpperCase()}`);
			mode.value = m;
		} catch (error) {
			console.error("Failed to switch alert mode: ", error);
			return;
		}
	}

	return {
		mode,
		switchMode,
	};
});
