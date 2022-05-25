import { createRouter, createWebHistory } from "vue-router";
import PublicView from "../views/public/PublicView.vue";
import ErrorLogin from "../views/errors/ErrorsLogin.vue";
import PrivateView from "../views/private/PrivateView.vue";
import { useTokenStore } from "@/stores/token";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: '/public',
    },
    {
      path: "/public",
      name: "publicView",
      component: PublicView,
    },
    {
      path: "/error",
      name: "errorView",
      component: ErrorLogin,
    },
    {
      path: "/private",
      name: "privateView",
      component: PrivateView,
      beforeEnter: (to, from, next) => {
        const tokenStore = useTokenStore()
        if (!tokenStore.getToken.token) {
          return next('/error')
        }
        next()
      }
    },
  ],
});

export default router;
