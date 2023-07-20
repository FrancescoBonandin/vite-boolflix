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

                    <singleCard v-if="store.searchGenre==null || store.searchResults.movies[i].genres.includes(store.searchs)" :singleElement="singleMovie" :singleIndex="i" :searchResultsArr="store.searchResults.movies" />
                    <!-- v-if="store.searchGenre!=null&&" -->
                </div>

            </div>

            <h2 v-if="store.searchResults.tvSeries.length > 0">TV series</h2>

            <div class="row row-cols-4 flex-wrap align-items-start">
                
                <div v-for="(singleSerie,i) in store.searchResults.tvSeries" :key="i" class="col my-3">

                    <singleCard v-if="store.searchGenre==null || store.searchResults.tvSeries[i].genres.includes(store.searchGenre)" :singleElement="singleSerie" :singleIndex="i" :searchResultsArr="store.searchResults.tvSeries" /> 
                    
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