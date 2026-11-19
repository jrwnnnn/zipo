import { LocalNotifications } from "@capacitor/local-notifications";

export async function notifyLocal(
	id: number,
	title: string,
	body: string,
): Promise<void> {
	await LocalNotifications.schedule({
		notifications: [
			{
				id: id,
				title,
				body,
				channelId: "alerts",
				smallIcon: "ic_zipo",
				isExactNotification: false,
			},
		],
	});
}
