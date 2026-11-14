import { Toast } from "@capacitor/toast";
import {
	BleClient,
	type BleDevice,
	dataViewToText,
} from "@capacitor-community/bluetooth-le";
import { defineStore } from "pinia";
import { ref } from "vue";

import { SERVICE_UUID, TX_UUID } from "@/services/uuids";

export const useConnectivityStore = defineStore("zipo", () => {
	const state = ref<"connected" | "connecting" | "idle">("idle");
	const esp = ref<BleDevice | null>(null);

	async function connect() {
		if (state.value !== "idle") return;
		let found = false;
		state.value = "connecting";

		try {
			await BleClient.initialize();
			await BleClient.requestLEScan(
				{ services: [SERVICE_UUID] },
				async (result) => {
					if (found) return;
					found = true;

					try {
						await BleClient.stopLEScan();

						// connect and listen to the found Zipo
						await BleClient.connect(result.device.deviceId, onDisconnect);
						await listen(result.device.deviceId);

						esp.value = {
							deviceId: result.device.deviceId,
							name: result.device.name,
						};
						state.value = "connected";

						console.log("Connected to", esp.value?.deviceId);
					} catch (error) {
						state.value = "idle";
						console.error("Connection failed:", error);
						await Toast.show({
							text: `Can't connect to ${esp.value?.deviceId}`,
							duration: "long",
						});
					}
				},
			);

			setTimeout(async () => {
				if (found) return;
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
		onDisconnect(id);
	}

	async function listen(id: string) {
		await BleClient.startNotifications(id, SERVICE_UUID, TX_UUID, (val) => {
			console.log(dataViewToText(val)); //log all messages from the ESP32 for now
		});
	}

	async function restore() {
		await BleClient.initialize();
		const [d] = await BleClient.getConnectedDevices([SERVICE_UUID]);
		if (!d) return false;

		state.value = "connecting";
		await BleClient.connect(d.deviceId, disconnect);
		await listen(d.deviceId);

		esp.value = { deviceId: d.deviceId, name: d.name };
		state.value = "connected";

		console.log("Connected to ", esp.value.deviceId);
	}

	// reset states
	function onDisconnect(id: string) {
		console.log("Disconnected from", id);
		esp.value = null;
		state.value = "idle";
	}

	return { state, esp, connect, disconnect, restore };
});
