<script>
import { store } from '../store'

export default {

    data() {
        return {
            product: {},
            categories: store.state.categories,
            products: store.state.products
        }
    },
    created() {
        if (this.$route.params.id) {
            this.getProduct(this.$route.params.id)
        }
    },
    methods: {
        getProduct(id) {
            this.product = store.getProductById(id)
        },
        submitForm() {
            console.log(this.product)
            if (this.$route.params.id) {
                store.editProduct(this.product);
            } else {
                store.addProduct(this.product);
            }
            this.$router.push('/')
        },
    }
}
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-3"></div>
            <div class="col-6 justify-content-center mt-5 mb-5">
                <form @submit.prevent="submitForm">
                    <fieldset>
                        <legend class="bg-dark text-white text-center">{{ !product.id ? 'Añadir' : 'Editar' }} producto
                        </legend>
                        <!-- AquÃ­ los inputs y botones del form -->
                        <div class="form-group">
                            <label for="newprod-id">ID:</label>
                            <input type="text" v-model="product.id" class="form-control" disabled>
                        </div>
                        <div class="form-group">
                            <label for="newprod-name">Nombre:</label>
                            <input type="text" v-model="product.name" class="form-control" required>
                            <span class="error"></span>
                        </div>
                        <div class="form-group">
                            <label for="newprod-cat">Categoria:</label>
                            <select v-model="product.category" class="form-control" required>
                                <option value="undefined" disabled selected>--- Selecciona categoria ---</option>
                                <option v-for="cat in categories" :key="cat.id" :value="cat.id"
                                    :title="cat.description">{{
                                        cat.name
                                    }}</option>
                            </select>
                            <span class="error"></span>
                        </div>

                        <div class="form-group">
                            <label for="newprod-units">Unidades.:</label>
                            <input type="number" v-model="product.units" class="form-control" min="0" step="1">
                            <span class="error"></span>
                        </div>
                        <div class="form-group">
                            <label for="newprod-price">Precio/u.:</label>
                            <input type="number" v-model="product.price" class="form-control" required min="0"
                                step="0.01">
                            <span class="error"></span>
                        </div>
                        <br>
                        <button type="submit" class="btn btn-default btn-dark">{{ !product.id
                        ?
                        'Añadir' : 'Editar' }}</button>
                        <button type="reset" class="btn btn-danger">Reset</button>
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
</template>

<!-- vista -->