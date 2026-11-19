import { Haptics } from "@capacitor/haptics";

import { useActivityLog } from "@/composables/useActivityLog";
import { notifyLocal } from "@/services/notifyLocal";

const { addActivity } = useActivityLog();
let id: number;
let timer: ReturnType<typeof setTimeout> | undefined;

export async function txHandle(incoming: string): Promise<void> {
	switch (incoming) {
		case "TRIGGER.LOW": {
			clearTimeout(timer);

			timer = setTimeout(async () => {
				id = (Date.now() % 2_147_483_647) + 1;

				addActivity("triggered", id);
				await notifyLocal(
					id,
					"Zipo triggered",
					`Detected at ${new Date().toLocaleTimeString()}`,
				);

				await Haptics.vibrate({ duration: 3000 });
			}, 2000);
			break;
		}

		case "TRIGGER.HIGH": {
			clearTimeout(timer);
			break;
		}

		default: {
			console.warn("Ignored:", incoming);
		}
	}
}
