import { defineStore } from "pinia";
import { ref } from "vue";

import { characteristics } from "@/services/characteristics";
import { activityLog } from "@/stores/activityLog";

export const useAlertStateStore = defineStore("alert state", () => {
	const isArmed = ref(false);

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

	/**
	 * Updates the client’s settings from the connected Zipo.
	 */
	async function sync(): Promise<void> {
		try {
			await characteristics.rxSend("SYNC");
		} catch (error) {
			console.error("Failed to sync Zipo: ", error);
			return;
		}
	}

	return {
		isArmed,
		arm,
		unarm,
		sync,
	};
});
