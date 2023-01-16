<script>
import { store } from '../store'
export default {
    props: {
        category: Object,
    },
    methods: {
        delCategory() {
            if (confirm(`¿Desea eliminar la categoria? (${this.category.name})`)) {
                try {
                    store.delCategory(this.category.id)
                } catch (err){
                    store.showMessage(err)
                }
            }
        },
    }
}
</script>

<template>
    <tr>
        <td>{{ category.id }}</td>
        <td>{{ category.name }}</td>
        <td>{{ category.description }}</td>
        <td class="buttons text-center">
            <button class="btn btn-secondary" @click="$router.push(`/editCategory/${category.id}`)">
                <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-danger" @click="delCategory">
                <i class="bi bi-trash"></i>
            </button>
        </td>
    </tr>
</template>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css");
</style>