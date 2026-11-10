<script setup lang="ts">
import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/vue";
import ActivityLog from "./ActivityLog.vue";
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
				<section class="mt-100 grid grid-cols-2 gap-2">
					<div
						class="flex aspect-square items-center justify-center rounded-full bg-white"
					></div>
					<div class="card aspect-square"></div>
				</section>

				<ActivityLog />
			</main>
		</ion-content>
	</ion-page>
</template>
