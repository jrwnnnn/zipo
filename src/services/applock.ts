import { defineStore } from "pinia";
import { ref } from "vue";

export const useUnlock = defineStore("unlock", () => {
	const isUnlockedByApp = ref(false);

	function setUnlockedByApp(status: boolean) {
		isUnlockedByApp.value = status;
	}

	function resetUnlock() {
		isUnlockedByApp.value = false;
	}

	return {
		isUnlockedByApp,
		setUnlockedByApp,
		resetUnlock,
	};
});
