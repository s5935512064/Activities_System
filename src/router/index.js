import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import firebase from "firebase/app";
import "firebase/auth"

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function ({
  store
}) {
  const Router = new VueRouter({
    scrollBehavior: () => ({
      x: 0,
      y: 0
    }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })
  Router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
    const adminOnly = to.matched.some(x => x.meta.adminOnly)
    const user = firebase.auth().currentUser
    if (requiresAuth && !user) {
      next(`/`)
    } else if (adminOnly && user.email != `kkte92665@gmail.com`) {
      next(`/`)
    } else if (requiresAuth && user) {
      next();
    } else {
      next();
    }
  })
  return Router
}
