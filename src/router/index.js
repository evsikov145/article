import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '../components/Auth'
import Posts from '../components/Posts'
import Edit from '../components/Post-edit'
import Add from '../components/Post-add'

Vue.use(VueRouter);

  const routes = [
      {
        path: '/auth',
        name: 'Auth',
        component: Auth
      },
      {
        path: '/',
        name: 'Posts',
        component: Posts
      },
      {
          path: '/edit',
          name: 'Edit',
          component: Edit,
          props: true
      },
      {
          path: '/add',
          name: 'Add',
          component: Add
      }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router
