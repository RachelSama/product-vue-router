<script>
import { store } from '../store'
import ProductItem from '../components/ProductItem.vue'

export default {
  components: {
    ProductItem
},
  data() {
    return {
      products: store.state.products,
    }
  },
  computed: {
    totalImport() {
        return this.products.reduce((total, product) => total += product.price * product.units, 0)
    }
  }
}
</script>

<template>
  <h1 class="w-75 m-auto mt-4 mb-3">Listado de productos</h1>
    <table class="table w-75 m-auto">
      <thead class="bg-dark text-center text-white">
        <th>Id</th>
        <th>Nombre</th>
        <th>Categoría</th>
        <th>Uds.</th>
        <th>Precio/u</th>
        <th>Importe</th>
        <th>Acciones</th>
      </thead>
      <tbody class="table-striped" v-if="products.length">
        <product-item v-for="product in products" :key="product.id" :product="product"></product-item>
      </tbody>
      <p v-else class="w-75 m-auto">No hay productos en la tienda</p>
    </table>
    <div class="row w-75 m-auto bg-dark text-white text-center p-1">
      <div class="col-6">Productos: {{ products.length }}</div>
      <div class="col-6">Importe total: {{ totalImport.toFixed(2) }} €</div>
    </div>  
</template>

<!-- vista -->