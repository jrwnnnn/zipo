<script setup lang="ts">
import { useActivityLog } from "@/composables/useActivityLog";

const { activities } = useActivityLog();
</script>

<template>
	<details class="card font-['SpaceGrotesk']">
		<summary class="flex cursor-pointer items-center justify-between">
			<div class="flex flex-col">
				<p class="font-['Geist'] font-bold">Activity Logs (See More)</p>

				<p v-if="activities.length > 0">
					{{ activities[0].status }} •
					<span class="text-[calc(0.925rem-2px)] text-white/65">
						{{ new Date(activities[0].timestamp).toLocaleDateString() }} at
						{{ new Date(activities[0].timestamp).toLocaleTimeString() }}
					</span>
				</p>
				<p v-else class="text-white/65">No logs recorded yet.</p>
			</div>
		</summary>

		<div class="custom-scrollbar mt-4 max-h-130 space-y-2 overflow-y-auto">
			<p v-if="activities.length === 0" class="text-white/65">
				Wow, it's empty in here!
			</p>

			<div
				v-for="(activity, index) in activities"
				:key="activity.id"
				class="card mb-2 border-b border-white/30 pb-2"
			>
				<ol class="m-0 list-none p-0">
					<li>
						<span class="text-[calc(0.925rem-2px)] text-white/65">
							#{{ activities.length - index }} •
						</span>

						{{ activity.status }}

						<span
							v-if="index === 0"
							class="ml-1 rounded bg-white/20 px-1.5 py-0.5 text-[calc(0.870rem-2px)] font-bold"
						>
							Latest
						</span>

						<span class="text-[calc(0.925rem-2px)] text-white/65">
							• {{ new Date(activity.timestamp).toLocaleDateString() }} at
							{{ new Date(activity.timestamp).toLocaleTimeString() }}
						</span>
						<br />
						{{ activity.label }}
					</li>
				</ol>
			</div>
		</div>
	</details>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
	width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
	background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
	background: rgba(255, 255, 255, 0.2);
	border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
	background: rgba(255, 255, 255, 0.4);
}
</style>
