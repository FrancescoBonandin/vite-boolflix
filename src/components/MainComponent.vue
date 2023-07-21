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

            <h2>movie</h2>

            <div v-if="store.searchResults.movie.length > 0" class="row row-cols-4 flex-wrap align-items-start">

                <div v-for="(singleMovie,i) in store.searchResults.movie" :key="i" class="col my-3">

                    <singleCard   :singleElement="singleMovie" :singleIndex="i" :searchResultsArr="store.searchResults.movie" />
                </div>

            </div>

            <p v-else>no results found</p>


            <h2 >TV series</h2>

            <div v-if="store.searchResults.tv.length > 0" class="row row-cols-4 flex-wrap align-items-start">
                
                <div v-for="(singleSerie,i) in store.searchResults.tv" :key="i" class="col my-3">

                    <singleCard  :singleElement="singleSerie" :singleIndex="i" :searchResultsArr="store.searchResults.tv" /> 
                </div>
                
            </div>

            <p v-else>no results found</p>

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