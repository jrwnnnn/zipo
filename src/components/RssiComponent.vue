<script setup lang="ts">
import { BleClient } from "@capacitor-community/bluetooth-le";
import { useConnectivityStore } from "@/stores/connectivity";
import { computed, onUnmounted, ref } from "vue";

const connectivity = useConnectivityStore();
const rssi = ref(0);

const level = computed(() => {
	if (connectivity.state !== "connected" || !connectivity.esp?.deviceId) {
		return 0;
	}

	if (rssi.value >= -50) return 6;
	if (rssi.value >= -60) return 5;
	if (rssi.value >= -70) return 4;
	if (rssi.value >= -80) return 3;
	if (rssi.value >= -90) return 2;
	return 1;
});

const timer = setInterval(async () => {
	if (connectivity.state === "connected" && connectivity.esp?.deviceId) {
		try {
			rssi.value = await BleClient.readRssi(connectivity.esp?.deviceId);
		} catch (error) {
			console.error("Failed to read RSSI", error);
		}
	} else {
		rssi.value = 0;
		return;
	}
}, 1000);

onUnmounted(() => clearInterval(timer));
</script>

<template>
	<div class="card flex aspect-square justify-between">
		<div class="flex flex-col justify-end">
			<div class="flex items-end font-[NType82]">
				<p class="text-6xl [text-box:trim-both_cap_alphabetic]">{{ rssi }}</p>
				<p class="text-muted ml-2 text-lg [text-box:trim-both_cap_alphabetic]">
					db
				</p>
			</div>
		</div>

		<div class="flex h-full flex-col justify-between">
			<span
				v-for="bead in 6"
				:key="bead"
				class="border-line h-5 w-5 rounded-full border"
				:class="
					connectivity.state == 'connected'
						? bead > 6 - level
							? 'bg-white'
							: ''
						: ''
				"
			></span>
		</div>
	</div>
</template>
