<script setup lang="ts">
import { computed } from "vue";
import { useZipoStore } from "@/stores/zipo";

const zipo = useZipoStore();

const shape = [
	"001111100",
	"011000110",
	"110000011",
	"110000011",
	"110000011",
	"111111111",
	"111111111",
	"110000011",
	"110000011",
	"110000011",
	"111111111",
	"111111111",
];

const shapeOut = [
	"001111100",
	"011000110",
	"110000011",
	"100000011",
	"000000011",
	"000000011",
	"111111111",
	"111111111",
	"110000011",
	"110000011",
	"110000011",
	"111111111",
	"111111111",
];

const currentShape = computed(() => (zipo.isArmed ? shape : shapeOut));
</script>

<template>
	<main>
		<div
			class="flex aspect-square items-center justify-center rounded-full bg-white"
		>
			<button
				@click="zipo.arm()"
				class="bg-primary relative flex h-3/4 w-3/4 items-center justify-center rounded-full"
			>
				<Transition name="fade" mode="out-in">
					<div
						:key="zipo.isArmed ? 'armed' : 'unarmed'"
						class="absolute flex translate-y-0 flex-col items-center"
					>
						<!-- Shape -->
						<div class="grid grid-cols-9 gap-1">
							<template v-for="(row, y) in currentShape" :key="y">
								<div
									v-for="(dot, x) in row"
									:key="x"
									class="h-1.5 w-1.5 rounded-full"
									:class="
										dot === '1'
											? zipo.isArmed
												? 'bg-red-500'
												: 'bg-black'
											: 'bg-transparent'
									"
								></div>
							</template>
						</div>

						<p
							class="mt-3 mb-0 font-[Geist] text-lg font-bold"
							:class="zipo.isArmed ? 'text-red-500' : 'text-black'"
						>
							{{ zipo.isArmed ? "Locked" : "Unlocked" }}
						</p>
					</div>
				</Transition>
				<p>Lock</p>
			</button>
		</div>
	</main>
</template>

<style scoped>
.fade-enter-active {
	transition: opacity 0.3s ease;
}

.fade-leave-active {
	transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0.4;
}
</style>
