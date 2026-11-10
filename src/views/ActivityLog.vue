<script setup lang="ts">
/*
add ref to the activities array later
Create a function that sends the new activity to the addActivity() argument.
*/

function getLocalTimeZone() {
	return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

function getLocalDateTime() {
	const now = new Date();

	return {
		timezone: getLocalTimeZone(),
		date: now.toLocaleDateString(),
		time: now.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
		}),
	};
}

const activities = [
	{
		id: 1,
		status: "Out of Signal",
		date: "11/11/2023",
		time: "1:16pm",
		info: "This is a test activity log",
	},

	{
		id: 2,
		status: "Connected",
		date: "11/10/2023",
		time: "5:49am",
		info: "This is another test activity log",
	},
];
/*
 function addActivity(status: string, info: string) {
    const local = getLocalDateTime()

    activities.value.unshift({
        id: Date.now(),
        status,
        date: local.date,
        time: local.time,
        timezone: local.timezone,
        info
    })
} 
 */
getLocalDateTime();
</script>

<template>
	<details class="card font-['SpaceGrotesk']">
		<summary class="flex items-center justify-between">
			<div class="flex flex-col">
				<p class="font-['Geist'] font-bold">Activity log (Click Me)</p>
				<p>
					No Activity. <br />
					You can see your logs here
				</p>
			</div>
		</summary>

		<div
			v-for="activity in activities"
			:key="activity.id"
			class="card border-b border-white/30"
		>
			<ol>
				<li>
					{{ activity.status }} •
					<span class="text-[calc(0.925rem-2px)] text-white/65">
						{{ activity.date }} at {{ activity.time }}</span
					>
					<br />
					{{ activity.info }}
				</li>
			</ol>
		</div>
		<!--<button @click="addActivity('New Activity', 'November 16', 'This is a new activity log')"> Add Activity
        Testing, delete later
        </button>-->
	</details>
</template>
