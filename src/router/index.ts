import { createRouter, createWebHistory } from "@ionic/vue-router";
import type { RouteRecordRaw } from "vue-router";

import AcitivitySummary from "../views/ActivitySummary.vue";
import HomePage from "../views/HomePage.vue";

const routes: RouteRecordRaw[] = [
	{
		path: "/",
		redirect: "/home",
	},
	{ path: "/home", name: "Home", component: HomePage },
	{
		path: "/summary/:eventId",
		name: "ActivitySummary",
		component: AcitivitySummary,
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
