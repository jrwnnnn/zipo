import { Capacitor } from "@capacitor/core";
import {
	ForegroundService,
	type ServiceType,
} from "@capawesome-team/capacitor-android-foreground-service";

import { useConnectivityStore } from "@/stores/connectivity";

const KEEP_ALIVE_CHANNEL_ID = "keepAlive";

ForegroundService.addListener("buttonClicked", async (e) => {
	if (e.buttonId === 1) {
		const connectivity = useConnectivityStore();
		await keepAlive(false);
		await connectivity.disconnect();
	}
});

export async function keepAlive(on: boolean): Promise<void> {
	if (!Capacitor.isNativePlatform()) return;
	try {
		if (on) {
			await ForegroundService.deleteNotificationChannel({
				id: "default",
			});

			await ForegroundService.createNotificationChannel({
				id: KEEP_ALIVE_CHANNEL_ID,
				name: "Foreground service",
				description: "Keeps Zipo running in the background.",
				importance: 3,
			});

			await ForegroundService.startForegroundService({
				id: 1,
				title: "Zipo is running",
				body: "Tap to disconnect",
				smallIcon: "ic_zipo",
				serviceType: 16 as ServiceType,
				notificationChannelId: KEEP_ALIVE_CHANNEL_ID,
			});
		} else {
			await ForegroundService.stopForegroundService();
		}
	} catch (error) {
		console.error("Foreground service failed:", error);
	}
}
