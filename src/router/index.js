import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Search from '../pages/Search.vue';
import Favorites from '../pages/Favorites.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/search', component: Search },
  { path: '/favorites', component: Favorites },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;