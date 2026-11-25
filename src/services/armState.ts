import { isArmed } from "@/services/armStatus";
import { characteristics } from "@/services/characteristics";

/**
 * Waits for BLE Write to send either true or false.
 * Sends the appropriate protocol command and updates the local state
 *
 * @property isArmed - Reactive state indicating whether the device is armed.
 * @exports STATE.GET - sends the data to cahracteristics.ts to handle
 */

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

	async syncArmState(): Promise<boolean> {
		return await characteristics.rxSend("STATE.GET");
	},
};
