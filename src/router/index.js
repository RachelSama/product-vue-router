import { createRouter, createWebHistory } from 'vue-router'
import ProductsTable from '../views/ProductsTable.vue'
import ProductForm from '../views/ProductForm.vue'
import AppAbout from '../views/AppAbout.vue'
import CategoryForm from '../views/CategoryForm.vue'
import CategoriesTable from '../views/CategoriesTable.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ProductsTable
    },
    {
      path: '/categories',
      name: 'CategoriesTable',
      component: CategoriesTable
    },
    {
      path: '/addProduct',
      name: 'AddProduct',
      component: ProductForm
    },
    {
      path: '/editProduct/:id',
      name: 'EditProduct',
      component: ProductForm,
      props: true
    },
    {
      path: '/addCategory',
      name: 'AddCategory',
      component: CategoryForm
    },
    {
      path: '/editCategory/:id',
      name: 'EditCategory',
      component: CategoryForm,
      props: true
    },
    {
      path: '/about',
      name: 'AboutUs',
      component: AppAbout
    }

  ]
})

export default router
