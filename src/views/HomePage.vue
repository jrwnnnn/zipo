<script setup lang="ts">
import { IonContent, IonPage } from "@ionic/vue";
</script>

<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<div
				id="container"
				class="flex h-full flex-col items-center justify-center gap-2"
			>
				<p class="text-xl font-bold">Ready to create an app?</p>
				<p>
					Start with Ionic
					<a
						target="_blank"
						rel="noopener noreferrer"
						href="https://ionicframework.com/docs/components"
						>UI Components</a
					>
				</p>
			</div>
		</ion-content>
	</ion-page>
</template>
