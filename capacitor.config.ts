import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
	appId: "io.jrwnnnn.zipo",
	appName: "zipo",
	webDir: "dist",
	android: {
		useLegacyBridge: true,
	},
};

export default config;
