import { Toast } from "@capacitor/toast";
import { BleClient, type BleDevice } from "@capacitor-community/bluetooth-le";
import { defineStore } from "pinia";
import { ref, watch } from "vue";

import { characteristics } from "@/services/characteristics";
import { keepAlive } from "@/services/keepAlive";
import { SERVICE_UUID } from "@/services/uuids";
import { activityLog } from "@/stores/activityLog";
import { useAlertStateStore } from "@/stores/alertState";

let timer: ReturnType<typeof setTimeout> | undefined;

export const useConnectivityStore = defineStore("connectivity", () => {
	const alertState = useAlertStateStore();
	const state = ref<"connected" | "connecting" | "idle">("idle");
	const esp = ref<BleDevice | null>(null);

	watch(state, (connectionState) => {
		if (connectionState !== "connected") alertState.isArmed = false;
	});

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
						await characteristics.txListen(result.device.deviceId);

						esp.value = {
							deviceId: result.device.deviceId,
							name: result.device.name,
						};

						state.value = "connected";

						await keepAlive.start();

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
			if (!d) return;

			state.value = "connecting";

			await BleClient.connect(d.deviceId, onDisconnect);
			await characteristics.txListen(d.deviceId);

			esp.value = { deviceId: d.deviceId, name: d.name };
			state.value = "connected";

			await keepAlive.start();

			console.log("Restored connection to ", esp.value.deviceId);
		} catch (error) {
			state.value = "idle";
			console.error("Restore connection failed:", error);
		}
	}

	async function onDisconnect(id: string) {
		await keepAlive.stop();

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
