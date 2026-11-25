import { Haptics } from "@capacitor/haptics";

import { isArmed } from "@/services/armStatus";
import { geolocation } from "@/services/geolocation";
import { notifyLocal } from "@/services/notifyLocal";
import { activityLog } from "@/stores/activityLog";

/**
 * Processes a command received from the Zipo device.
 *
 * @param incoming - Command received from the BLE TX characteristic.
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
			const id = await activityLog.addActivity(
				"triggered",
				await geolocation.getPosition(),
			);

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
