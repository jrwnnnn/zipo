import { Toast } from "@capacitor/toast";
import { BleClient, type BleDevice } from "@capacitor-community/bluetooth-le";
import { defineStore } from "pinia";
import { ref } from "vue";

import { txListen } from "@/services/characteristics";
import { addActivity } from "@/services/logs";
import { SERVICE_UUID, RX_UUID } from "@/services/uuids";

export const useConnectivityStore = defineStore("zipo", () => {
	const state = ref<"connected" | "connecting" | "idle">("idle");
	const esp = ref<BleDevice | null>(null);
	const isUnlockedByApp = ref(false);

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

						await BleClient.connect(result.device.deviceId, onDisconnect);
						await txListen(result.device.deviceId);

						esp.value = {
							deviceId: result.device.deviceId,
							name: result.device.name,
						};
						state.value = "connected";
						addActivity(
							"Connected",
							`Connected to ${result.device.name} (${result.device.deviceId})`,
						);

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

		// If it's a real device, disconnect via BLE plugin
		if (!id.startsWith("MOCK-")) {
			await BleClient.disconnect(id);
		}

		onDisconnect(id);
	}

	async function restore() {
		await BleClient.initialize();
		const d = (await BleClient.getConnectedDevices([SERVICE_UUID])).find(
			(d) => d.name === "Zipo",
		);
		if (!d) return false;

		state.value = "connecting";
		await BleClient.connect(d.deviceId, disconnect);
		await txListen(d.deviceId);

		esp.value = { deviceId: d.deviceId, name: d.name };
		state.value = "connected";
		addActivity(
			"Restored Connection",
			`Reconnected to ${d.name} (${d.deviceId})`,
		);

		console.log("Connected to ", esp.value.deviceId);
	}

	function setUnlockedByApp(status: boolean) {
		isUnlockedByApp.value = status;
	}

	// Bypass alarm for manual access
	async function unlockZipo() {
		if (!esp.value || state.value !== "connected") {
			await Toast.show({
				text: "Device not connected.",
				duration: "short",
			});
			return;
		}

		const deviceId = esp.value.deviceId;

		try {
			// Only call native BLE write if it's NOT a mock device
			if (!deviceId.startsWith("MOCK-")) {
				const data = new DataView(new Uint8Array([0x01]).buffer);
				await BleClient.write(deviceId, SERVICE_UUID, RX_UUID, data);
			} else {
				console.log("[Mock Mode] Skipped physical BLE write for unlock");
			}

			isUnlockedByApp.value = true;
			addActivity("Unlocked", `Sent unlock command to Zipo (${deviceId})`);

			await Toast.show({
				text: "Zipo unlocked successfully!",
				duration: "short",
			});
		} catch (error) {
			console.error("Failed to unlock Zipo:", error);
			await Toast.show({
				text: "Failed to unlock Zipo.",
				duration: "long",
			});
		}
	}

	// Lock system to alert and ready the alarms
	async function lockZipo() {
		if (!esp.value || state.value !== "connected") {
			await Toast.show({
				text: "Device not connected.",
				duration: "short",
			});
			return;
		}

		const deviceId = esp.value.deviceId;

		try {
			// Only call native BLE write if it's NOT a mock device
			if (!deviceId.startsWith("MOCK-")) {
				const data = new DataView(new Uint8Array([0x00]).buffer);
				await BleClient.write(deviceId, SERVICE_UUID, RX_UUID, data);
			} else {
				console.log("[Mock Mode] Skipped physical BLE write for lock");
			}

			isUnlockedByApp.value = false;
			addActivity(
				"Locked / Armed",
				`Sent lock/alarm-ready command to Zipo (${deviceId})`,
			);

			await Toast.show({
				text: "Zipo locked and alarms alerted.",
				duration: "short",
			});
		} catch (error) {
			console.error("Failed to lock Zipo:", error);
			await Toast.show({
				text: "Failed to lock Zipo.",
				duration: "long",
			});
		}
	}

	// Temporary helper to mock connection state for UI testing
	function setMockConnectionState(mockState: "connected" | "idle") {
		state.value = mockState;
		if (mockState === "connected") {
			esp.value = { deviceId: "MOCK-DEVICE-1234", name: "Zipo Mock" };
			addActivity(
				"Mock Connected",
				"Manually forced connection state to connected",
			);
		} else {
			esp.value = null;
			isUnlockedByApp.value = false;
			addActivity(
				"Mock Disconnected",
				"Manually forced connection state to idle",
			);
		}
	}

	// reset states
	function onDisconnect(id: string) {
		console.log("Disconnected from", id);
		esp.value = null;
		state.value = "idle";
		isUnlockedByApp.value = false;
		addActivity(
			"Bluetooth Lost",
			`Lost connection or reception from device ${id}`,
		);
	}

	return {
		state,
		esp,
		isUnlockedByApp,
		connect,
		disconnect,
		restore,
		setUnlockedByApp,
		unlockZipo,
		lockZipo,
		setMockConnectionState,
	};
});
