import { characteristics } from "@/services/characteristics";

/**
 * Updates the client’s settings from the connected Zipo.
 */
export async function sync(): Promise<void> {
	try {
		await characteristics.rxSend("SYNC");
	} catch (error) {
		console.error("Failed to sync Zipo: ", error);
		return;
	}
}
