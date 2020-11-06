import VueRouter from "vue-router"

// Lazy load of components
const Dashboard = () => import(/* webpackChunkName: "dashboard" */ '@/components/Dashboard')
const Transactions = () => import(/* webpackChunkName: "transactions" */ '@/components/Transactions')

const router = new VueRouter({
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Dashboard
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard
    },
    {
      path: "/transactions",
      name: "transactions",
      component: Transactions
    }
  ],
  linkActiveClass: "active",
  linkExactActiveClass: "active",
  mode: "history"
})

export default router
