<script>

export default {

}
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
		<div class="container-fluid">
			<h1>Almacén ACME</h1>
			<div class="collapse navbar-collapse">
				<div class="navbar-nav">
					<router-link to="/" class="nav-link">Productos</router-link>
					<router-link to="/categories" class="nav-link">Categorías</router-link>
					<router-link to="/addProduct" class="nav-link">Añadir producto</router-link>
					<router-link to="/addCategory" class="nav-link">Añadir categoría</router-link>
					<router-link to="/about" class="nav-link">Sobre nosotros</router-link>
				</div>
			</div>
		</div>
	</nav>
</template>

<!-- vista -->