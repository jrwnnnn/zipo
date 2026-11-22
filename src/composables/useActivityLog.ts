import { useStorage } from "@vueuse/core";

interface Activity {
	id: number;
	status: string;
	label: string;
	timestamp: number;
}

const activities = useStorage<Activity[]>("activities", []);
const LABELS = {
	triggered: "Compromised",
	connected: "Connected",
	disconnected: "Disconnected",
} as const;

type Status = keyof typeof LABELS;

export const activityLog = {
	/**
	 * Adds a new entry to the  activity log.
	 *
	 * @param status - Activity type used to determine the displayed label.
	 * @param id - Optional entry ID. A generated numeric ID is used when omitted.
	 */
	addActivity(status: Status, id?: number) {
		activities.value.unshift({
			id: id || (Date.now() % 2_147_483_647) + 1,
			status: status,
			label: LABELS[status],
			timestamp: Date.now(),
		});
	},

	getActivities() {
		return activities;
	},
};
