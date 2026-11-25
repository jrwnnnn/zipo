import { type RemovableRef, useStorage } from "@vueuse/core";

import { type Coords } from "@/services/geolocation";

type ActivityType = keyof typeof LABELS;

interface Activity {
	id: number;
	type: ActivityType;
	label: string;
	timestamp: number;
	geolocation: Coords | null;
}

const activities = useStorage<Activity[]>("activities", []);
const LABELS = {
	triggered: "Compromised",
	connected: "Connected",
	disconnected: "Disconnected",
	armed: "Armed",
	disarmed: "Disarmed",
};

export const activityLog = {
	/**
	 * Adds a new entry to the  activity log.
	 *
	 * @param type - Activity type used to determine the displayed label.
	 * @param geolocation - Optional coordinates associated with the activity.
	 * @returns The ID assigned to the newly created activity.
	 */
	async addActivity(
		type: ActivityType,
		geolocation?: Coords | null,
	): Promise<number> {
		const id = (Date.now() % 2_147_483_647) + 1;

		activities.value.unshift({
			id,
			type,
			label: LABELS[type],
			timestamp: Date.now(),
			geolocation: geolocation || null,
		});

		return id;
	},

	getActivities(): RemovableRef<Activity[]> {
		return activities;
	},
};
