export function txHandle(incoming: string): void {
	switch (incoming) {
		case "TRIGGER.LOW": {
			// reed switch contact IS NOT detecting a magnetic field
			break;
		}
		case "TRIGGER.HIGH": {
			// reed switch contact IS detecting a magnetic field
			break;
		}

		default: {
			console.warn("Ignored:", incoming);
		}
	}
}
