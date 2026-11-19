import { Toast } from "@capacitor/toast";
import { BleClient, type BleDevice } from "@capacitor-community/bluetooth-le";
import { defineStore } from "pinia";
import { ref } from "vue";

import { useActivityLog } from "@/composables/useActivityLog";
import { txListen } from "@/services/characteristics";
import { SERVICE_UUID } from "@/services/uuids";

const activityLog = useActivityLog();
let timer: ReturnType<typeof setTimeout> | undefined;

export const useConnectivityStore = defineStore("connectivity", () => {
	const state = ref<"connected" | "connecting" | "idle">("idle");
	const esp = ref<BleDevice | null>(null);

	async function connect() {
		if (state.value !== "idle") return;
		state.value = "connecting";

		try {
			await BleClient.initialize();
			await BleClient.requestLEScan(
				{ services: [SERVICE_UUID] },
				async (result) => {
					clearTimeout(timer);
					try {
						await BleClient.stopLEScan();
						await BleClient.connect(result.device.deviceId, onDisconnect);
						await txListen(result.device.deviceId);

						esp.value = {
							deviceId: result.device.deviceId,
							name: result.device.name,
						};
						state.value = "connected";

						activityLog.addActivity("connected");
						console.log("Connected to", esp.value?.deviceId);
					} catch (error) {
						state.value = "idle";

						console.error("Connection failed:", error);
					}
				},
			);

			timer = setTimeout(async () => {
				clearTimeout(timer);

				BleClient.stopLEScan();

				state.value = "idle";

				console.log("No compatible Zipo device found.");
				await Toast.show({
					text: "No compatible Zipo device found.",
					duration: "long",
				});
			}, 8000);
		} catch (error) {
			state.value = "idle";
			console.error("Connection failed:", error);
		}
	}

	async function disconnect() {
		if (!esp.value) return;
		const id = esp.value.deviceId;
		await BleClient.disconnect(id);
	}

	async function restore() {
		try {
			await BleClient.initialize();
			const d = (await BleClient.getConnectedDevices([SERVICE_UUID])).find(
				(d) => d.name === "Zipo",
			);
			if (!d) return false;

			state.value = "connecting";

			await BleClient.connect(d.deviceId, onDisconnect);
			await txListen(d.deviceId);

			esp.value = { deviceId: d.deviceId, name: d.name };
			state.value = "connected";

			console.log("Connected to ", esp.value.deviceId);
		} catch (error) {
			console.error("Connection failed:", error);
		}
	}

	function onDisconnect(id: string) {
		esp.value = null;
		state.value = "idle";

		activityLog.addActivity("disconnected");
		console.log("Disconnected from", id);
	}

	return {
		state,
		esp,
		connect,
		disconnect,
		restore,
	};
});
