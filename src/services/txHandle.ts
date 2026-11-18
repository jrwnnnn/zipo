import { useActivityLog } from "@/composables/useActivityLog";

export function txHandle(incoming: string): void {
	const { addActivity } = useActivityLog();

	switch (incoming) {
		case "TRIGGER.LOW": {
			addActivity("triggered");
			break;
		}

		case "TRIGGER.HIGH": {
			addActivity("closed");
			break;
		}

		default: {
			console.warn("Ignored:", incoming);
		}
	}
}
