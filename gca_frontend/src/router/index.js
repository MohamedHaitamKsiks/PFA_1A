import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import EditDossierView from '../views/EditDossierView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    //dossier routes
    {
      path: '/dossier/add',
      name: 'add dossier',
      component: EditDossierView
    },
    {
      path: '/dossier/edit/:type/:id',
      name: 'edit dossier',
      component: EditDossierView
    }
  ]
})

export default router
