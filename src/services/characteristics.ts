import {
	BleClient,
	dataViewToText,
	textToDataView,
} from "@capacitor-community/bluetooth-le";

import { txHandle } from "@/services/txHandle";
import { SERVICE_UUID, TX_UUID, RX_UUID } from "@/services/uuids";
import { useConnectivityStore } from "@/stores/connectivity";

/**
 * Provides BLE characteristic operations for communicating with Zipo.
 */
export const characteristics = {
	/**
	 * Starts listening for messages from the Zipo device TX characteristic.
	 * Each message is passed to {@link txHandle}.
	 *
	 * @param id - Device ID of the connected Zipo device.
	 */
	async txListen(id: string): Promise<void> {
		await BleClient.startNotifications(
			id,
			SERVICE_UUID,
			TX_UUID,
			(incoming) => {
				const message = dataViewToText(incoming).trim();
				console.log("Received:", message);
				txHandle(message);
			},
		);
	},

	/**
	 * Sends a message to the Zipo device RX characteristic.
	 * Ignored if no device is connected.
	 *
	 * @param outgoing - Message to send to the Zipo device.
	 */
	async rxSend(outgoing: string): Promise<void> {
		const connectivity = useConnectivityStore();
		if (!connectivity.esp) return;

		await BleClient.write(
			connectivity.esp.deviceId,
			SERVICE_UUID,
			RX_UUID,
			textToDataView(outgoing),
		);
	},
};
