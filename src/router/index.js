import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '../components/Auth'
import List from '../components/List'


Vue.use(VueRouter);

  const routes = [
 {
    path: '/auth',
    name: 'Auth',
    component: Auth
  },
    {
      path: '/',
      name: 'List',
      component: List
    },
];

const router = new VueRouter({
  routes
});

export default router
