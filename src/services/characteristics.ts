import { BleClient, dataViewToText } from "@capacitor-community/bluetooth-le";

import { txHandle } from "@/services/txHandle";
import { SERVICE_UUID, TX_UUID } from "@/services/uuids";

export async function txListen(id: string): Promise<void> {
	await BleClient.startNotifications(id, SERVICE_UUID, TX_UUID, (incoming) => {
		const message = dataViewToText(incoming).trim();

		console.log("Received:", message);

		txHandle(message);
	});
}
