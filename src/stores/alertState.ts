import { defineStore } from "pinia";
import { ref, watch } from "vue";

import { characteristics } from "@/services/characteristics";
import { activityLog } from "@/stores/activityLog";
import { useConnectivityStore } from "@/stores/connectivity";

export const useAlertStateStore = defineStore("alert state", () => {
	const connectivity = useConnectivityStore();
	const isArmed = ref(false);

	watch(
		() => connectivity.state,
		(state) => {
			if (state !== "connected") isArmed.value = false;
		},
	);

	/**
	 * Arms the connected Zipo.
	 * Creates an "armed" activity entry in the activity log.
	 */
	async function arm(): Promise<void> {
		try {
			await characteristics.rxSend("ARM");
			activityLog.addActivity("armed");
			isArmed.value = true;
		} catch (error) {
			console.error("Failed to arm Zipo: ", error);
			return;
		}
	}

	/**
	 * Disarms the connected Zipo.
	 * Creates a "disarmed" activity entry in the activity log.
	 */
	async function unarm(): Promise<void> {
		try {
			await characteristics.rxSend("DISARM");
			activityLog.addActivity("disarmed");
			isArmed.value = false;
		} catch (error) {
			console.error("Failed to unarm Zipo: ", error);
			return;
		}
	}

	return {
		isArmed,
		arm,
		unarm,
	};
});
