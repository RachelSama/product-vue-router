import { reactive } from 'vue';
import axios from 'axios';

const SERVER = 'http://localhost:3000'

export const store = {
    debug: true,

    state: reactive({
        products: [],
        categories: [],
        messages: []
    }),

    async loadData() {

        try {
            if (this.state.products.length === 0 && this.state.categories.length === 0) {
                const [categoriasData, productosData] = await Promise.all([axios.get(`${SERVER}/categories`),
                axios.get(`${SERVER}/products`)])

                categoriasData.data.forEach((categoria) => this.state.categories.push(categoria))
                productosData.data.forEach((producto) => this.state.products.push(producto))
            }
        } catch (err) {
            this.showMessage(err)
        }
    },

    productNameExist(name, id) {
        let prod = this.state.products.find(product => product.name === name);
        if (prod) {
            if (id) {
                if (prod.id != id) {
                    return true
                } else {
                    return false
                }
            }
            return true
        } else {
            return false
        }
    },

    getCategoryById(id) {

        let cat = this.state.categories.find(category => category.id == id);
        if (!cat) {
            throw 'No existe una categoria con id: ' + id
        }
        return cat
    },

    getCategoryByName(name) {

        let cat = this.state.categories.find(category => category.name.toLowerCase() === name.toLowerCase());

        if (cat == null) {
            throw 'No existe una categoria con name: ' + name
        } else {
            return cat
        }
    },

    getProductById(id) {

        let prod = this.state.products.find(product => product.id == id)

        if (prod == null) {
            throw 'No existe un producto con id: ' + id
        }
        return prod
    },

    getProductsByCategory(id) {

        return this.state.products.filter(product => product.category == id)
    },

    async addProduct(payload) {
        if (!payload.name.trim()) {
            throw 'Debe tener un nombre definido'
        }

        if (!payload.category || !this.getCategoryById(payload.category)) {
            throw 'No existe la categoria o no la has introducido'
        }

        if (!payload.price || payload.price < 0 || isNaN(payload.price)) {
            throw 'El precio no es correcto'
        }

        if (payload.units) {
            if (payload.units < 0) {
                throw 'Las unidades no son correctas, debe ser mayor de 0'
            } else if (isNaN(payload.units)) {
                throw 'Las unidades no son correctas, debe ser un numero'
            } else if (payload.units % 1 != 0) {
                throw 'Las unidades no son correctas, debe ser un numero entero'
            }

        }

        try {
            const dataProduct = await axios.post(`${SERVER}/products`, {
                name: `${payload.name}`,
                price: `${payload.price}`,
                category: `${Number(payload.category)}`,
                units: `${Number(payload.units)}`
            })
            this.state.products.push(dataProduct.data)
        } catch (err) {
            this.showMessage(err)
        }

    },

    async editProduct(payload) {
        if (!payload.name.trim()) {
            throw 'Debe tener un nombre definido'
        }

        if (!payload.category || !this.getCategoryById(payload.category)) {
            throw 'No existe la categoria o no la has introducido'
        }

        if (payload.units < 0) {
            throw 'No se puede restar unidades si no hay unidades'
        }

        if (!payload.price || payload.price < 0 || isNaN(payload.price)) {
            throw 'El precio no es correcto'
        }

        if (payload.units) {
            if (payload.units < 0) {
                throw 'Las unidades no son correctas, debe ser mayor de 0'
            } else if (isNaN(payload.units)) {
                throw 'Las unidades no son correctas, debe ser un numero'
            } else if (payload.units % 1 != 0) {
                throw 'Las unidades no son correctas, debe ser un numero entero'
            }
        }

        try {

            const dataProduct = await axios.put(`${SERVER}/products/${payload.id}`, {
                name: payload.name,
                price: payload.price,
                category: payload.category,
                units: payload.units
            })

            console.log(dataProduct)

            let id = dataProduct.data.id
            let index = this.state.products.findIndex(product => product.id === id);

            this.state.products[index].name = dataProduct.data.name
            this.state.products[index].category = dataProduct.data.category
            this.state.products[index].price = Number(dataProduct.data.price)
            this.state.products[index].units = Number(dataProduct.data.units)

        } catch (err) {
            this.showMessage(err)
        }
    },



    async delProduct(id) {
        let existProduct = this.getProductById(id)
        if (!existProduct) {
            throw 'No se puede eliminar el producto porque no existe'
        }

        if (existProduct.units > 0) {
            throw 'No se puede eliminar el producto porque tiene unidades disponibles'
        }

        try {

            await axios.delete(`${SERVER}/products/${id}`)

            let index = this.state.products.findIndex(product => product.id === id);
            this.state.products.splice(index, 1);

        } catch (err) {
            this.showMessage(err)
        }
    },

    clearMessage(index) {
        if (this.debug) console.log('clearMessage triggered')
        this.state.messages.splice(index, 1)
    },

    showMessage(message) {
        if (this.debug) console.log('showMessage triggered with ', message)
        this.state.messages.push(message)
    },

    totalImport() {
        return total = this.state.products.reduce((total, product) => total += product.productImport(), 0)
    },

    orderByUnitsDesc() {
        return this.state.products.sort((a, b) => a.units < b.units ? 1 : -1);
    },

    orderByName() {
        return this.state.products.sort((a, b) => a.name.localeCompare(b.name));
    },

    underStock(units) {
        return this.state.products.filter(product => product.units < units)
    },


    async addCategory(payload) {

        console.log(payload)

        if (!payload.name.trim()) {
            throw 'Debe tener un nombre definido'
        }

        let cat = null
        try {
            cat = this.getCategoryByName(payload.name)
        } catch (error) { }

        if (cat != null) {
            throw 'Error! ' + payload.name + ' ya es un nombre de una categoria'
        }

        try {

            const dataCat = await axios.post(`${SERVER}/categories`, {
                name: `${payload.name}`,
                description: `${payload.description}`
            })

            this.state.categories.push(dataCat.data)

        } catch (err) {
            this.showMessage(err)
        }
    },

    async editCategory(payload) {
        if (!payload.name.trim()) {
            throw 'Debe tener un nombre definido'
        }

        let catSearched = null
        try {
            catSearched = this.getCategoryByName(payload.name)
        } catch (error) { }

        if (catSearched != null) {
            if (catSearched.id != payload.id) {
                throw 'Error! ' + payload.name + ' ya es un nombre de una categoria'
            }
        }

        try {

            const dataCat = await axios.put(`${SERVER}/categories/${payload.id}`, {
                name: `${payload.name}`,
                description: `${payload.description}`
            })

            let id = dataCat.data.id
            let index = this.state.categories.findIndex(category => category.id === id);
            this.state.categories[index].name = dataCat.data.name
            this.state.categories[index].description = dataCat.data.description

        } catch (err) {
            this.showMessage(err)
        }

    },

    async delCategory(id) {
        let existCategory = this.getCategoryById(id)
        let haveProducts = this.getProductsByCategory(id)

        if (!existCategory || haveProducts.length !== 0) {
            throw 'No se puede eliminar la categoria porque tiene productos'
        }
        try {

            await axios.delete(`${SERVER}/categories/${id}`)
            let index = this.state.categories.findIndex(category => category.id === id);
            this.state.categories.splice(index, 1);

        } catch (err) {
            this.showMessage(err)
        }
    }

} 