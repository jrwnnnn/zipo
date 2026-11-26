import { LocalNotifications } from "@capacitor/local-notifications";

import router from "@/router";

await LocalNotifications.addListener(
	"localNotificationActionPerformed",
	({ notification }) => {
		void router.push({
			name: "ActivitySummary",
			params: { eventId: notification.id },
		});
	},
);

export async function notifyLocal(
	id: number,
	title: string,
	body: string,
): Promise<void> {
	await LocalNotifications.createChannel({
		id: "alerts",
		name: "Alerts",
		importance: 5,
	});

	await LocalNotifications.schedule({
		notifications: [
			{
				id: id,
				title,
				body,
				channelId: "alerts",
				smallIcon: "ic_warning",
				isExactNotification: false,
			},
		],
	});
}
