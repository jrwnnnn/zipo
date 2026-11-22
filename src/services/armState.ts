import { ref } from "vue";

import { characteristics } from "@/services/characteristics";

const isArmed = ref(false);

export const armControls = {
	isArmed,

	async armState(): Promise<boolean> {
		const success = await characteristics.rxSend("STATE.ARM");

		if (!success) return false;

		isArmed.value = true;
		return true;
	},

	async unarmState(): Promise<boolean> {
		const success = await characteristics.rxSend("STATE.DISARM");

		if (!success) return false;

		isArmed.value = false;
		return true;
	},

	async toggleArmState(): Promise<void> {
		if (isArmed.value) {
			await this.unarmState();
		} else {
			await this.armState();
		}
	},
};
