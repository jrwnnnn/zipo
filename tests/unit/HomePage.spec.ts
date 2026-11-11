import { mount } from "@vue/test-utils";
import { createPinia } from "pinia";
import { describe, expect, test, vi } from "vitest";

import HomePage from "@/views/HomePage.vue";

vi.mock("@capacitor-community/bluetooth-le", () => ({
	BleClient: {
		initialize: vi.fn(),
		getConnectedDevices: vi.fn().mockResolvedValue([]),
		requestLEScan: vi.fn(),
		stopLEScan: vi.fn(),
		connect: vi.fn(),
		disconnect: vi.fn(),
		startNotifications: vi.fn(),
	},
	dataViewToText: vi.fn(),
}));

describe("HomePage.vue", () => {
	test("renders home vue", () => {
		const wrapper = mount(HomePage, {
			global: { plugins: [createPinia()] },
		});
		expect(wrapper.get("#top-bar").text()).toBe("Zipo");
	});
});
