import {
	BleClient,
	dataViewToText,
	textToDataView,
} from "@capacitor-community/bluetooth-le";

import { txHandle } from "@/services/txHandle";
import { SERVICE_UUID, TX_UUID, RX_UUID } from "@/services/uuids";
import { useConnectivityStore } from "@/stores/connectivity";

const connectivity = useConnectivityStore();
export async function txListen(id: string): Promise<void> {
	await BleClient.startNotifications(id, SERVICE_UUID, TX_UUID, (incoming) => {
		const message = dataViewToText(incoming).trim();
		console.log("Received:", message);
		txHandle(message);
	});
}

export async function rxSend(outgoing: string): Promise<void> {
	if (!connectivity.esp) return;

	await BleClient.write(
		connectivity.esp.deviceId,
		SERVICE_UUID,
		RX_UUID,
		textToDataView(outgoing),
	);
}
