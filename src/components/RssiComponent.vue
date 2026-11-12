<script setup lang="ts">
import { BleClient } from "@capacitor-community/bluetooth-le";
import { useConnectivityStore } from "@/stores/connectivity";
import {ref} from "vue";

const connectivity = useConnectivityStore();
const rssi = ref<number>(0);

setInterval(async () => {
  if (connectivity.state === "connected" && connectivity.esp?.deviceId) {
    try {
      rssi.value = await BleClient.readRssi(connectivity.esp?.deviceId);
    } catch (error) {
      console.error("Failed to read RSSI", error);
    }
  }
}, 1000);
</script>

<template>
  <h1 class="rssi">RSSI: {{ rssi }}</h1>
</template>

<style scoped>
.rssi {
  display: grid;
  place-items: center;
  height: 100%;
  margin: 0;
  font-variant-numeric: tabular-nums;
}
</style>