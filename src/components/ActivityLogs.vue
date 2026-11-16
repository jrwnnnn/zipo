<script setup lang="ts">
import { useActivityLogs } from "@/services/activity";
import { txHandle } from "@/services/txHandle";
import { latestActivity } from "@/services/logs";
import { useConnectivityStore } from "@/stores/connectivity";

const { activities, clearActivities } = useActivityLogs();
const connectivityStore = useConnectivityStore();

function handleTestClick(triggerType: string) {
	txHandle(triggerType);
}
</script>

<template>
	<div class="display flex gap-2 px-3 py-2">
		<button
			@click="connectivityStore.setMockConnectionState('connected')"
			class="mt-2 cursor-pointer rounded bg-white/10 px-3 py-1"
		>
			Open
		</button>
		<button
			@click="connectivityStore.setMockConnectionState('idle')"
			class="mt-2 cursor-pointer rounded bg-white/10 px-3 py-1"
		>
			Close
		</button>
		<button
			@click="clearActivities()"
			class="mt-2 cursor-pointer rounded bg-white/10 px-3 py-1"
		>
			Clear History
		</button>

		<button
			@click="handleTestClick('TRIGGER.HIGH')"
			class="mt-2 cursor-pointer rounded bg-white/10 px-3 py-1"
		>
			High
		</button>
		<button
			@click="handleTestClick('TRIGGER.LOW')"
			class="mt-2 cursor-pointer rounded bg-white/10 px-3 py-1"
		>
			Low
		</button>
	</div>

	<details class="card font-['SpaceGrotesk']">
		<summary class="flex cursor-pointer items-center justify-between">
			<div class="flex flex-col">
				<p class="font-['Geist'] font-bold">Activity Logs (See More)</p>

				<p v-if="latestActivity">
					{{ latestActivity.status }} •
					<span class="text-[calc(0.925rem-2px)] text-white/65">
						{{ latestActivity.date }} at {{ latestActivity.time }}
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
							• {{ activity.date }} at {{ activity.time }}
						</span>
						<br />
						{{ activity.info }}
					</li>
				</ol>
			</div>
		</div>
	</details>
</template>
