import { useActivityLogs } from "@/services/activity";
import { useConnectivityStore } from "@/stores/connectivity";

export function txHandle(incoming: string): void {
	const { addActivity } = useActivityLogs();
	const connectivityStore = useConnectivityStore();

	switch (incoming) {
		case "TRIGGER.LOW": {
			if (connectivityStore.isUnlockedByApp) {
				addActivity(
					"Opened",
					"You have successfully opened the Zipo with the app.",
				);

				connectivityStore.setUnlockedByApp(false);
			} else {
				addActivity(
					"Compromised",
					"Alert! Your Zipo has been opened without permission!",
				);
			}
			break;
		}

		case "TRIGGER.HIGH": {
			addActivity("CLOSED", "Your Zipo's lid is firmly closed.");
			break;
		}

		default: {
			console.warn("Ignored:", incoming);
		}
	}
}
