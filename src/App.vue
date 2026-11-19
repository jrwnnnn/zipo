<script setup lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { onMounted } from "vue";
import { LocalNotifications } from "@capacitor/local-notifications";

onMounted(async () => {
	await LocalNotifications.requestPermissions();
	await LocalNotifications.createChannel({
		id: "alerts",
		name: "Alerts",
		importance: 5,
	});
});
</script>

<template>
	<ion-app>
		<ion-router-outlet />
	</ion-app>
</template>
