import { Geolocation, type Position } from "@capacitor/geolocation";

export type Coords = Position["coords"];

export const geolocation = {
	/**
	 * Gets the device's current geographic coordinates.
	 * Returns `null` when the location cannot be retrieved.
	 */
	async getPosition(): Promise<Position["coords"] | null> {
		try {
			const geolocation = await Geolocation.getCurrentPosition();
			return geolocation.coords;
		} catch (error) {
			console.error("Failed to get current position:", error);
			return null;
		}
	},
};
