<script>
import {store} from '../store.js'
export default {
    name: "MainComponent",
    data() {
        return {
            store,

        }
    },
    methods: {

    }
}
</script>

<template>
    <main>
        <div class="container">
            <div class="row">
                <div v-for="(singleMovie,i) in store.searchResults.movies" :key="i" class="col-auto">
                    <p>titolo: {{ singleMovie.title }} </p>
                    <p>titolo originale:{{ singleMovie.original_title }} </p>
                    <p>lingua: {{ singleMovie.original_language }} </p>
                    <p>voto: {{ parseFloat(singleMovie.vote_average).toFixed(1) }} </p>
                    
                </div>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.col-auto{
    border:solid 1px red;
}

</style>