<script setup lang="ts">
import ConnectionStatus from "@/components/ConnectionStatus.vue";
import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/vue";
import ActivityLogs from "@/components/ActivityLogs.vue";
import { useConnectivityStore } from "@/stores/connectivity";

const connectivityStore = useConnectivityStore();
</script>

<template>
	<ion-page>
		<ion-content :fullscreen="true" class="ion-padding">
			<ion-header class="ion-no-border">
				<ion-toolbar>
					<ion-title
						id="top-bar"
						class="ion-text-center bg-primary font-[NType82] text-3xl"
					>
						Zipo
					</ion-title>
				</ion-toolbar>
			</ion-header>

			<main class="flex min-h-full flex-col gap-3">
				<ConnectionStatus />

				<!-- Action Buttons: Unlock & Lock Zipo -->
				<div class="flex gap-2 p-4">
					<button
						@click="connectivityStore.unlockZipo()"
						class="cursor-pointer rounded bg-blue-600 px-4 py-2 text-white"
					>
						Unlock Zipo
					</button>

					<button
						@click="connectivityStore.lockZipo()"
						class="cursor-pointer rounded bg-red-600 px-4 py-2 text-white"
					>
						Lock Zipo
					</button>
				</div>

				<section class="grid grid-cols-2 gap-2">
					<div
						class="flex aspect-square items-center justify-center rounded-full bg-white"
					></div>
					<div class="card aspect-square"></div>
				</section>

				<ActivityLogs />
			</main>
		</ion-content>
	</ion-page>
</template>
