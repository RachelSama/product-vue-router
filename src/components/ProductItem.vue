<script>
import { store } from '../store'
export default {
    props: {
        product: Object,
    },
    methods: {
        sumUnitsToProduct() {
            this.product.units ++
            store.editProduct(this.product)
        },
        restUnitsToProduct() {
            this.product.units --
            store.editProduct(this.product)
        },
        delProduct() {
            if (confirm(`¿Desea eliminar el producto? (${this.product.name})`)) {
                try {
                    store.delProduct(this.product.id)
                } catch (err){
                    store.showMessage(err)
                }
            }
        },
    },
    computed: {
        productImport() {
            return this.product.units * this.product.price
        }
    }
}
</script>

<template>
    <tr>
        <td>{{ product.id }}</td>
        <td>{{ product.name }}</td>
        <td>{{ product.category }}</td>
        <td>{{ product.units }}</td>
        <td>{{ product.price }} €</td>
        <td>{{ productImport.toFixed(2) }} €</td>
        <td class="buttons text-center">
            <button class="btn btn-secondary" @click="sumUnitsToProduct">
                <i class="bi bi-arrow-up"></i>
            </button>
            <button class="btn btn-secondary" @click="restUnitsToProduct" :disabled="!product.units">
                <i class="bi bi-arrow-down"></i>
            </button>
            <button class="btn btn-secondary" @click="$router.push(`/editProduct/${product.id}`)">
                <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-danger" @click="delProduct">
                <i class="bi bi-trash"></i>
            </button>
        </td>
    </tr>
</template>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css");
</style>