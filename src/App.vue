<script setup lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { onMounted } from "vue";
import { LocalNotifications } from "@capacitor/local-notifications";
import { useConnectivityStore } from "./stores/connectivity";

onMounted(async () => {
	await useConnectivityStore().restore();

	await LocalNotifications.requestPermissions();
});
</script>

<template>
	<ion-app>
		<ion-router-outlet />
	</ion-app>
</template>
