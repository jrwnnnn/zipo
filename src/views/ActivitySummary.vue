<script setup lang="ts">
import {
	IonBackButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonPage,
	IonToolbar,
} from "@ionic/vue";
import { useRoute } from "vue-router";
import { activityLog } from "@/stores/activityLog";
import connectIcon from "@/assets/ui/connect-icon.png";
import disconnectIcon from "@/assets/ui/disconnect-icon.png";
import warningIcon from "@/assets/ui/warning-icon.png";
import { InAppBrowser } from "@capacitor/inappbrowser";

const route = useRoute();

async function openLocation() {
	await InAppBrowser.openInExternalBrowser({
		url: mapsUrl,
	});
}

const activity = activityLog
	.getActivities()
	.value.find((activity) => activity.id === Number(route.params.eventId));
const geolocation = activity?.geolocation;
const mapsUrl = geolocation
	? `https://maps.google.com/maps?q=${geolocation.latitude},${geolocation.longitude}&z=15&output=embed`
	: "";
</script>

<template>
	<ion-page>
		<ion-content :fullscreen="true" class="ion-padding">
			<ion-header class="ion-no-border">
				<ion-toolbar>
					<ion-buttons slot="start">
						<ion-back-button default-href="/home"></ion-back-button>
					</ion-buttons>
				</ion-toolbar>
			</ion-header>

			<main class="flex flex-col gap-3" v-if="activity">
				<div class="flex h-60 flex-col items-center justify-center gap-5">
					<img
						:src="
							{
								triggered: warningIcon,
								connected: connectIcon,
								disconnected: disconnectIcon,
							}[activity.type]
						"
						class="w-15"
					/>
					<p class="text-center font-[NType82] text-3xl">
						{{ activity.label }}
					</p>
				</div>
				<div class="card flex flex-col gap-2 text-sm">
					<div class="flex justify-between">
						<p class="text-m">Timestamp</p>
						<p class="text-muted">
							{{ new Date(activity.timestamp as number).toLocaleDateString() }}
							{{ new Date(activity.timestamp as number).toLocaleTimeString() }}
						</p>
					</div>
					<div class="flex justify-between">
						<p class="text-m">Alert mode</p>
						<p class="text-muted text-right">Full</p>
					</div>
					<div v-if="geolocation" class="flex justify-between">
						<p class="text-m">Location</p>
						<p class="text-muted text-right">
							{{ geolocation.latitude }}°
							{{ geolocation.latitude >= 0 ? "N" : "S" }}<br />
							{{ geolocation.longitude }}°
							{{ geolocation.latitude >= 0 ? "E" : "W" }}
						</p>
					</div>

					<div v-if="geolocation" @click="openLocation()">
						<iframe
							:src="mapsUrl"
							width="100%"
							loading="lazy"
							class="pointer-events-none h-50 rounded-md border-none"
						></iframe>
					</div>
				</div>
			</main>
		</ion-content>
	</ion-page>
</template>
