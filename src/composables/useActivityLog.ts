import { type RemovableRef, useStorage } from "@vueuse/core";

interface Activity {
	id: number;
	status: string;
	label: string;
	timestamp: number;
}

interface ActivityLog {
	activities: RemovableRef<Activity[]>;
	addActivity: (status: Status) => void;
}

const activities = useStorage<Activity[]>("activities", []);
const LABELS = {
	triggered: "Compromised",
	connected: "Connected",
	disconnected: "Disconnected",
} as const;

type Status = keyof typeof LABELS;

export function useActivityLog(): ActivityLog {
	function addActivity(status: Status) {
		activities.value.unshift({
			id: Date.now(),
			status: status,
			label: LABELS[status],
			timestamp: Date.now(),
		});
	}

	return { activities, addActivity };
}
