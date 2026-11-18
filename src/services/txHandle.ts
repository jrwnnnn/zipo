import { useActivityLogs } from "@/services/activity";

export function txHandle(incoming: string): void {
	const { addActivity } = useActivityLogs();

	switch (incoming) {
		case "TRIGGER.LOW": {
			addActivity(
				"Compromised",
				"Alert! Your Zipo has been opened without permission!",
			);
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
