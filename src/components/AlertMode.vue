<script setup lang="ts">
import { useAlertModeStore } from "@/stores/alertMode";
import { useConnectivityStore } from "@/stores/connectivity";

const connectivity = useConnectivityStore();
const alertMode = useAlertModeStore();

import radarIcon from "@/assets/ui/radar-icon.png";
import phoneIcon from "@/assets/ui/phone-icon.png";
import piezoIcon from "@/assets/ui/piezo-icon.png";

const options = [
	{ value: "full", label: "Full", icon: radarIcon },
	{ value: "phone", label: "Phone only", icon: phoneIcon },
	{ value: "zipo", label: "Zipo only", icon: piezoIcon },
] as const;
</script>

<template>
	<div
		v-if="connectivity.state === 'connected'"
		class="card flex flex-col gap-5"
	>
		<p class="font-[Geist] font-bold">Alert mode</p>

		<div class="flex items-center justify-around">
			<button
				v-for="o in options"
				:key="o.value"
				class="flex flex-col items-center gap-2"
				@click="alertMode.switchMode(o.value)"
			>
				<span
					class="border-line flex h-17 w-17 items-center justify-center rounded-full border"
					:class="{ 'bg-white': alertMode.mode === o.value }"
				>
					<img
						:src="o.icon"
						alt=""
						class="h-6 w-6"
						:class="{ invert: alertMode.mode !== o.value }"
					/>
				</span>
				<span
					class="text-sm"
					:class="{ 'text-muted': alertMode.mode !== o.value }"
				>
					{{ o.label }}
				</span>
			</button>
		</div>
	</div>
</template>
