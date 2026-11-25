<script setup lang="ts">
import DotMatrix from "@/components/DotMatrix.vue";
import RssiComponent from "@/components/RssiComponent.vue";
import ZipoControls from "@/components/ZipoControls.vue";
import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/vue";
import ActivityLog from "@/components/ActivityLog.vue";
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

			<main class="flex min-h-full flex-col gap-2">
				<DotMatrix />

				<ZipoControls />
				<section class="grid grid-cols-2 gap-2">
					<div class="card aspect-square"></div>
					<RssiComponent />
				</section>

				<ActivityLog />
			</main>
		</ion-content>
	</ion-page>
</template>
