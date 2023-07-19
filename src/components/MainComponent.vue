<script>
import {store} from '../store.js'
import CountryFlag from 'vue-country-flag-next'

export default {
    name: "MainComponent",
    components:{
        CountryFlag
    },
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
            <h2 v-if="store.searchResults.movies.length > 0">Movies</h2>
            <div class="row">
                <div v-for="(singleMovie,i) in store.searchResults.movies" :key="i" class="col-auto">
                    <p>titolo: {{ singleMovie.title }} </p>
                    <p>titolo originale:{{ singleMovie.original_title }} </p>
                    
                    <p>lingua:
                        <span v-if="singleMovie.original_language!=''">
                            <CountryFlag :country="singleMovie.original_language=='en'? 'gb':singleMovie.original_language " size="small"/>
                        </span>

                        <span v-else>
                            
                            {{ singleMovie.original_language }}

                        </span>
                    </p>
                    <p>voto: {{ parseFloat(singleMovie.vote_average).toFixed(1) }} </p>
                    
                </div>
            </div>

            <h2 v-if="store.searchResults.tvSeries.length > 0">TV series</h2>

            <div class="row">
                <div v-for="(singleSerie,i) in store.searchResults.tvSeries" :key="i" class="col-auto">
                    <p>titolo: {{ singleSerie.name }} </p>
                    <p>titolo originale:{{ singleSerie.original_name }} </p>
                    
                    <p>lingua:
                        <span v-if="singleSerie.original_language!=''">
                            <CountryFlag :country="singleSerie.original_language=='en'? 'gb':singleSerie.original_language " size="small"/>
                        </span>

                        <span v-else>
                            
                            {{ singleSerie.original_language }}

                        </span>
                    </p>
                    <p>voto: {{ parseFloat(singleSerie.vote_average).toFixed(1) }} </p>
                    
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