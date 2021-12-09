import Vue from "vue"
import VueRouter, { RouteConfig } from "vue-router"

Vue.use(VueRouter)

const beforeEnter = async (to: any, from: any, next: any) => {
  if (!localStorage.getItem("access_token")) return next("/")

  next()
}

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/apps",
    name: "Apps",
    component: () => import("@/views/Apps.vue"),
    beforeEnter,
  },
  {
    path: "/oauth",
    name: "OAuth",
    component: () => import("@/views/OAuth.vue"),
  },
  {
    path: "*",
    name: "404",
    component: () => import("@/views/404.vue"),
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
