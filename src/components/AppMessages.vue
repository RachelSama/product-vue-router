<script>
import { store } from '../store'
export default {
    data() {
        return {
            messages: store.state.messages
        }
    }, 
    methods: {
        delMessage() {
            store.clearMessageAction(index)
        }
    }
}
</script>

<template>
    <div class="row">
		<div role="alert" v-for="(message, index) in messages" :key="index">
			{{ message }}
			<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"
				@click="delMessage(index)"></button>
		</div>
	</div>
</template>