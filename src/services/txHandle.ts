import { Haptics } from "@capacitor/haptics";

import { activityLog } from "@/composables/useActivityLog";
import { geolocation } from "@/services/geolocation";
import { notifyLocal } from "@/services/notifyLocal";

/**
 * Processes a trigger message received from the Zipo device.
 *
 * @param incoming - Message received from the BLE TX characteristic.
 */
export async function txHandle(incoming: string): Promise<void> {
	switch (incoming) {
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
