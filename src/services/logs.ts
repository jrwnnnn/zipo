import { computed } from "vue";

import { useActivityLogs } from "@/services/activity";

const { activities } = useActivityLogs();

function getLocalTimeZone() {
	return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

function getLocalDateTime() {
	const now = new Date();

	return {
		timezone: getLocalTimeZone(),
		date: now.toLocaleDateString(),
		time: now.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
		}),
	};
}

export function addActivity(
	status: string,
	info: string,
): { status: string; date: string; time: string; info: string } {
	const local = getLocalDateTime();

	activities.value.unshift({
		id: Date.now(),
		status,
		date: local.date,
		time: local.time,
		info,
	});

	return {
		status,
		date: local.date,
		time: local.time,
		info,
	};
}

export const latestActivity = computed(() => activities.value[0] || null);
