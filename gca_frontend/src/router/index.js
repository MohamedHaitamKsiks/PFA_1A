import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import EditDossierView from '../views/EditDossierView.vue'
import AddDossierView from '../views/AddDossierView.vue'
import AddClientView from '../views/AddClientView.vue'

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
    //add client
    {
      path: '/client',
      name: 'add client',
      component: AddClientView
    },
    //dossier routes
    {
      path: '/dossier/add',
      name: 'add_dossier',
      component: AddDossierView
    },
    {
      path: '/dossier/edit/:type/:id',
      name: 'edit_dossier',
      component: EditDossierView
    },

  ]
})

export default router
