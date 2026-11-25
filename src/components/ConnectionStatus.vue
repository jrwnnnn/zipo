<script setup lang="ts">
import { useConnectivityStore } from "@/stores/connectivity";
import { onMounted } from "vue";

const connectivity = useConnectivityStore();
onMounted(() => {
	connectivity.restore();
});
</script>

<template>
	<div class="my-20 flex flex-col items-center justify-center gap-5">
		<div
			class="flex w-full flex-col items-center justify-center gap-3"
			@click="
				connectivity.state == 'connected'
					? connectivity.disconnect()
					: connectivity.connect()
			"
		>
			<!--TODO: Replace this with 12x12 dot matrix icon or something else-->
			<span
				class="aspect-square w-40"
				:class="connectivity.state == 'connected' ? 'bg-red-500' : 'bg-line'"
			>
			</span>
			<div class="text-center">
				<p
					class="font-[Geist] font-bold"
					:class="
						connectivity.state == 'connected' ? 'text-red-500' : 'text-muted'
					"
				>
					{{
						connectivity.state == "connected"
							? "Disconnect"
							: connectivity.state == "idle"
								? "Connect"
								: "Connecting..."
					}}
				</p>

				<p class="text-muted">{{ connectivity.esp?.name || "" }}</p>
				<p class="text-muted">{{ connectivity.esp?.deviceId || "" }}</p>
			</div>
		</div>
	</div>
</template>
