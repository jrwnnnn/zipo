<script setup lang="ts">
import { activityLog } from "@/composables/useActivityLog";

import connectIcon from "@/assets/ui/connect-icon.png";
import disconnectIcon from "@/assets/ui/disconnect-icon.png";
import warningIcon from "@/assets/ui/warning-icon.png";
</script>

<template>
	<div class="card flex min-h-100 flex-col gap-3">
		<p class="font-['Geist'] font-bold">Activity log</p>
		<hr class="bg-line" />
		<div class="flex flex-col gap-3">
			<router-link
				v-for="activity in activityLog.getActivities().value"
				:key="activity.id"
				class="flex items-center gap-3"
				:to="`/summary/${activity.id}`"
			>
				<img
					:src="
						{
							triggered: warningIcon,
							connected: connectIcon,
							disconnected: disconnectIcon,
						}[activity.type]
					"
					class="aspect-square w-6"
				/>
				<div>
					<p class="font-[Geist] text-white">
						{{ activity.label }}
					</p>
					<p class="text-muted text-xs">
						{{ new Date(activity.timestamp).toLocaleString() }}
					</p>
				</div>
			</router-link>
		</div>
	</div>
</template>
