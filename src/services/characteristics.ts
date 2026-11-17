import { BleClient, dataViewToText } from "@capacitor-community/bluetooth-le";

import { SERVICE_UUID, TX_UUID } from "@/services/uuids";

export async function txListen(id: string): Promise<void> {
	await BleClient.startNotifications(id, SERVICE_UUID, TX_UUID, (incoming) => {
		console.log(dataViewToText(incoming)); //log all messages from the ESP32 for now
	});
}
