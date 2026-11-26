<script setup lang="ts">
import { useConnectivityStore } from "@/stores/connectivity";
import { useAlertStateStore } from "@/stores/alertState";

const connectivity = useConnectivityStore();
const alertState = useAlertStateStore();

async function toggleConnectivity() {
	if (connectivity.state === "connecting") return;
	if (connectivity.state === "connected") await connectivity.disconnect();
	else await connectivity.connect();
}

async function toggleModes() {
	if (!alertState.isArmed) await alertState.arm();
	else await alertState.disarm();
}
</script>

<template>
	<div class="flex gap-2 font-[Geist]! font-bold">
		<button
			type="button"
			v-if="connectivity.state === 'connected'"
			class="card w-full rounded-full!"
			:class="alertState.isArmed ? 'text-red-600' : ''"
			@click="toggleModes()"
		>
			{{ alertState.isArmed ? "Disarm" : "Arm" }}
		</button>

		<button
			type="button"
			class="card rounded-full!"
			:class="connectivity.state === 'connected' ? 'bg-red-600!' : 'w-full'"
			:disabled="connectivity.state === 'connecting'"
			@click="toggleConnectivity()"
		>
			{{
				{
					connecting: "Connecting...",
					connected: "Disconnect",
					idle: "Connect",
				}[connectivity.state]
			}}
		</button>
	</div>
</template>
