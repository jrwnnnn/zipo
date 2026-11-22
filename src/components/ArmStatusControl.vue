<script setup lang="ts">
import { ref } from "vue";
import { armControls } from "@/services/armState";

const isArmed = ref(false);
</script>

<template>
	<main>
		<div
			class="flex aspect-square items-center justify-center rounded-full bg-white"
		>
			<button
				@click="armControls.toggleArmState()"
				class="bg-primary flex h-3/4 w-3/4 items-center justify-center rounded-full font-['Geist'] font-bold text-black"
			>
				<p class="font-[Geist] text-2xl">
					{{ isArmed ? "State: Armed" : "State: Unarmed" }}
				</p>
			</button>
		</div>
	</main>
</template>
