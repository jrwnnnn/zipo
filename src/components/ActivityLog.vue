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
			<div
				v-for="activity in activityLog.getActivities().value"
				:key="activity.id"
				class="flex items-center gap-3"
			>
				<img
					:src="
						activity.status === 'connected'
							? connectIcon
							: activity.status === 'triggered'
								? warningIcon
								: disconnectIcon
					"
					class="aspect-square w-6"
				/>
				<div>
					<p
						class="font-[Geist]"
						:class="activity.status === 'triggered' ? 'text-red-500' : ''"
					>
						{{ activity.label }}
					</p>
					<p class="text-muted text-xs">
						{{ new Date(activity.timestamp).toLocaleString() }}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
