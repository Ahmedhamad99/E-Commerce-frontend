import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import DashboardLayout from "../layouts/DashboardLayout.vue";
import Dashboard from "../pages/Dashboard.vue";
import Products from "../pages/Products.vue";
import Orders from "../pages/Orders.vue";
import { useAuthStore } from "../stores/auth";

const routes = [
    {
        path: "/login",
        component: Login,
    },
    { path: "/register", component: Register },

    {
        path: "/",
        component: DashboardLayout,
        meta: { requiresAuth: true },
        children: [
            { path: "", component: Dashboard },
            { path: "products", component: Products },
            { path: "orders", component: Orders },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const auth = useAuthStore();

    if (to.meta.requiresAuth && !auth.token) {
        return next("/login");
    }
    next();
});

export default router;
