import { Haptics } from "@capacitor/haptics";

import { geolocation } from "@/services/geolocation";
import { notifyLocal } from "@/services/notifyLocal";
import { activityLog } from "@/stores/activityLog";
import { useZipoStore } from "@/stores/zipo";

/**
 * Processes a command received from the Zipo device.
 *
 * @param incoming - Command received from the BLE TX characteristic.
 */
export async function txHandle(incoming: string): Promise<void> {
	const zipo = useZipoStore();

	switch (incoming) {
		case "STATE.ARMED": {
			zipo.isArmed = true;
			break;
		}

		case "STATE.DISARMED": {
			zipo.isArmed = false;
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
