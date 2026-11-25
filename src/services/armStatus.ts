import { ref } from "vue";

export const isArmed = ref(false);

// This file is implemented to prevent dependencies and cycling in armState.ts
