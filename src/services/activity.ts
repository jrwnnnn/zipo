import { useStorage, type RemovableRef } from "@vueuse/core";

interface Activity {
	id: number;
	status: string;
	date: string;
	time: string;
	info: string;
}

//provide the type to useStorage
const activities = useStorage<Activity[]>("activities", []);

//explicitly define the return type for the composable
export interface UseActivityLogsReturn {
	activities: RemovableRef<Activity[]>;
	addActivity: (status: string, info: string) => void;
	clearActivities: () => void;
}

export function useActivityLogs(): UseActivityLogsReturn {
	function addActivity(status: string, info: string): void {
		activities.value.unshift({
			id: Date.now(),
			status,
			date: new Date().toLocaleDateString(),
			time: new Date().toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
			}),
			info,
		});
	}

	function clearActivities(): void {
		activities.value = [];
	}

	return {
		activities,
		addActivity,
		clearActivities,
	};
}
