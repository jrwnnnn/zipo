import { Haptics } from "@capacitor/haptics";

import { useActivityLog } from "@/composables/useActivityLog";
import { isArmed } from "@/services/armStatus";
import { notifyLocal } from "@/services/notifyLocal";

const { addActivity } = useActivityLog();
let id: number;

/**
 * ARM - DISARMED for ESP32 to manage and call back
 *
 * `TRIGGER.LOW` records a compromised event, schedules a local alert, and
 * vibrates the device for three seconds. `TRIGGER.HIGH` is reserved and
 * currently has no behavior. Other messages are ignored with a warning.
 *
 * @param incoming - Message received from the BLE TX characteristic.
 */

export async function txHandle(incoming: string): Promise<void> {
	switch (incoming) {
		case "STATE.ARMED": {
			isArmed.value = true;
			break;
		}

		case "STATE.DISARMED": {
			isArmed.value = false;
			break;
		}

		case "TRIGGER.LOW": {
			id = (Date.now() % 2_147_483_647) + 1;

			addActivity("triggered", id);
			await notifyLocal(
				id,
				"Zipo triggered",
				`Detected at ${new Date().toLocaleTimeString()}`,
			);

			await Haptics.vibrate({ duration: 3000 });
			break;
		}

		case "TRIGGER.HIGH": {
			break;
		}

		default: {
			console.warn("Ignored:", incoming);
		}
	}
}
