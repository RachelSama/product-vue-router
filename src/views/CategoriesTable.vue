<script>
import { store } from '../store'
import CategoryItem from '../components/CategoryItem.vue'

export default {
  components: {
    CategoryItem
},
  data() {
    return {
      categories: store.state.categories,
    }
  }
}
</script>

<template>
  <h1 class="w-75 m-auto mt-4 mb-3">Listado de categorias</h1>
    <table class="table w-75 m-auto">
      <thead class="bg-dark text-center text-white">
        <th>Id</th>
        <th>Nombre</th>
        <th>Descripción</th>
        <th>Acciones</th>
      </thead>
      <tbody class="table-striped" v-if="categories.length">
        <category-item v-for="category in categories" :key="category.id" :category="category"></category-item>
      </tbody>
      <p v-else class="w-75 m-auto">No hay categorias en la tienda</p>
    </table>
    <div class="row w-75 m-auto bg-dark text-white text-center p-1">
      <div class="col-6">Categorias: {{ categories.length }}</div>
    </div>  
</template>

<!-- vista -->