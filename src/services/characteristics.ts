import { BleClient } from "@capacitor-community/bluetooth-le";

import { txHandle } from "@/services/txHandle";
import { SERVICE_UUID, TX_UUID } from "@/services/uuids";

/**
 * Starts listening for notifications from the ESP32 peripheral on the TX characteristic.
 * @param deviceId The Bluetooth device ID of the connected Zipo
 */

export async function txListen(deviceId: string): Promise<void> {
	try {
		await BleClient.startNotifications(
			deviceId,
			SERVICE_UUID,
			TX_UUID, //TX characteristic coming FROM the ESP32
			(value: DataView) => {
				//Decode the incoming DataView into "TRIGGER.LOW" or "TRIGGER.HIGH"
				const decoder = new TextDecoder();
				const incomingMessage = decoder.decode(value.buffer).trim();

				console.log("[BLE RX] Received notification:", incomingMessage);

				//Pass the decoded message straight into your txHandle logic
				txHandle(incomingMessage);
			},
		);
		console.log(`Successfully subscribed to notifications for ${deviceId}`);
	} catch (error) {
		console.error("Failed to start BLE notifications:", error);
	}
}
