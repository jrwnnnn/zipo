import { type RemovableRef, useStorage } from "@vueuse/core";

import { type Coords } from "@/services/geolocation";

type Status = keyof typeof LABELS;

interface Activity {
	id: number;
	status: Status;
	label: string;
	timestamp: number;
	geolocation: Coords | null;
}

const activities = useStorage<Activity[]>("activities", []);
const LABELS = {
	triggered: "Compromised",
	connected: "Connected",
	disconnected: "Disconnected",
};

export const activityLog = {
	/**
	 * Adds a new entry to the  activity log.
	 *
	 * @param status - Activity type used to determine the displayed label.
	 */
	async addActivity(
		status: Status,
		geolocation?: Coords | null,
	): Promise<number> {
		const id = (Date.now() % 2_147_483_647) + 1;

		activities.value.unshift({
			id,
			status,
			label: LABELS[status],
			timestamp: Date.now(),
			geolocation: geolocation || null,
		});

		return id;
	},

	getActivities(): RemovableRef<Activity[]> {
		return activities;
	},
};
