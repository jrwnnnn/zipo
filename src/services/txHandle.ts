import { Haptics } from "@capacitor/haptics";

import { geolocation } from "@/services/geolocation";
import { notifyLocal } from "@/services/notifyLocal";
import { activityLog } from "@/stores/activityLog";
import { useAlertModeStore } from "@/stores/alertMode";
import { useAlertStateStore } from "@/stores/alertState";

/**
 * Processes a command received from the Zipo device.
 *
 * @param incoming - Command received from the BLE TX characteristic.
 */
export async function txHandle(incoming: string): Promise<void> {
	const alertState = useAlertStateStore();
	const alertMode = useAlertModeStore();

	switch (incoming) {
		case "ARM": {
			alertState.isArmed = true;
			break;
		}

		case "DISARM": {
			alertState.isArmed = false;
			break;
		}

		case "MODE.FULL": {
			alertMode.mode = "full";
			break;
		}

		case "MODE.PHONE": {
			alertMode.mode = "phone";
			break;
		}

		case "MODE.ZIPO": {
			alertMode.mode = "zipo";
			break;
		}

		case "TRIGGER.LOW": {
			const id = await activityLog.addActivity(
				"triggered",
				await geolocation.getPosition(),
			);

			if (alertMode.mode === "zipo") break;

			await notifyLocal(id, "Zipo triggered", "Tap to view");
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
