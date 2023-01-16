<script>
import { store } from '../store'

export default {

    data() {
        return {
            category: {},
            categories: store.state.categories,
        }
    },
    created() {
        if (this.$route.params.id) {
            this.getCategory(this.$route.params.id)
        }
    },
    methods: {
        getCategory(id) {
            this.category = store.getCategoryById(id)
        },
        submitForm() {
            if (this.$route.params.id) {
                store.editCategory(this.category);
            } else {
                store.addCategory(this.category);
            }
            this.$router.push('/categories')
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
                        <legend class="bg-dark text-white text-center">{{ !category.id ? 'Añadir' : 'Editar' }} categoria
                        </legend>
                        <!-- AquÃ­ los inputs y botones del form -->
                        <div class="form-group">
                            <label for="newcat-id">ID:</label>
                            <input type="text" v-model="category.id" class="form-control" disabled>
                        </div>
                        <div class="form-group">
                            <label for="newcat-name">Nombre:</label>
                            <input type="text" v-model="category.name" class="form-control" required>
                            <span class="error"></span>
                        </div>
                        <div class="form-group">
                            <label for="newcat-units">Descripción</label>
                            <input type="text" v-model="category.description" class="form-control" min="0" step="1">
                            <span class="error"></span>
                        </div>
                        <br>
                        <button type="submit" class="btn btn-default btn-dark">{{ !category.id
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