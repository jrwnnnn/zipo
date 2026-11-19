import { Capacitor } from "@capacitor/core";
import { ForegroundService } from "@capawesome-team/capacitor-android-foreground-service";

import { useConnectivityStore } from "@/stores/connectivity";

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
			await ForegroundService.startForegroundService({
				id: 1,
				title: "Zipo is running",
				body: "Connected",
				smallIcon: "ic_zipo",
				buttons: [
					{
						id: 1,
						title: "Disconnect",
					},
				],
			});
		} else {
			await ForegroundService.stopForegroundService();
		}
	} catch (error) {
		console.error("Foreground service failed:", error);
	}
}
