<script setup lang="ts">
import { useConnectivityStore } from "@/stores/connectivity";
import { useZipoStore } from "@/stores/zipo";

const connectivity = useConnectivityStore();
const zipo = useZipoStore();

async function toggleConnectivity() {
	if (connectivity.state === "connecting") return;
	if (connectivity.state === "connected") await connectivity.disconnect();
	else await connectivity.connect();
}

async function toggleModes() {
	if (!zipo.isArmed) await zipo.arm();
	else await zipo.unarm();
}
</script>

<template>
	<div class="flex gap-2 font-[Geist]! font-bold">
		<button
			type="button"
			v-if="connectivity.state === 'connected'"
			class="card w-full rounded-full!"
			:class="zipo.isArmed ? 'text-red-600' : ''"
			@click="toggleModes()"
		>
			{{ zipo.isArmed ? "Disarm" : "Arm" }}
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
