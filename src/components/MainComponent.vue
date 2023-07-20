<script>
import {store} from '../store.js'
import singleCard from './SingleCard.vue'

export default {
    name: "MainComponent",
    components:{
        singleCard,
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

            <div class="row row-cols-4 flex-wrap align-items-start">

                <div v-for="(singleMovie,i) in store.searchResults.movies" :key="i" class="col my-3">

                    <singleCard  :singleElement="singleMovie" />

                </div>

            </div>

            <h2 v-if="store.searchResults.tvSeries.length > 0">TV series</h2>

            <div class="row row-cols-4 flex-wrap align-items-start">
                
                <div v-for="(singleSerie,i) in store.searchResults.tvSeries" :key="i" class="col my-3">

                    <singleCard :singleElement="singleSerie"/> 
                    
                </div>

            </div>

        </div>

    </main>
</template>

<style lang="scss" scoped>

main{

   h2{
    color:red;
   }

}

.card{
    border:solid 1px red;

  
}

</style>