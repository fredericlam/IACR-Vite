import { createWebHistory, createRouter } from "vue-router";

const history = createWebHistory();

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('./pages/Home.vue') , 
    meta: { breadcrumb: [ { name: 'home' } ] }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('./pages/About.vue') , 
    meta: { breadcrumb: [ { name: 'about' } ] }
  },
  {
    path: '/registries',
    name: 'registries',
    component: () => import('./pages/Registries.vue') , 
    meta: { breadcrumb: [ { name: 'registries' } ] }
  },
  {
    path: '/registries/:registry_slug/:population_id',
    name: 'registry_sheet',
    component: () => import('./pages/Registry.vue') , 
    meta: { breadcrumb: [ { name: 'registry' } ] }
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('./pages/Contact.vue') , 
    meta: { breadcrumb: [ { name: 'contact' } ] }
  },
  // aliases
  { path: "/:catchAll(.*)", redirect: '/404' }
] ; 

const Router = createRouter({ history, routes });

export default Router ; 