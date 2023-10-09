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

       
    },
    
}
</script>

<template>
    <main>
        <div class="container">

            <h2 class="mt-5">Movies</h2>

            <div v-if="store.searchResults.movie.length > 0" class="row flex-no-wrap align-items-start content-container">

                <div   class="col my-3">

                    <div class="d-flex">
                        <singleCard v-for="(singleMovie,i) in store.searchResults.movie" :key="i"  :singleElement="singleMovie" :singleIndex="i" :searchResultsArr="store.searchResults.movie" />
                    </div>

                </div>

            </div>

            <p v-else>no results found</p>


            <h2 class="mt-5">TV series</h2>

            <div v-if="store.searchResults.tv.length > 0" class="row flex-no-wrap align-items-start content-container">
                
                <div  class="col my-3">
                    
                    <div class="d-flex">
                        <singleCard v-for="(singleSerie,i) in store.searchResults.tv" :key="i" :singleElement="singleSerie" :singleIndex="i" :searchResultsArr="store.searchResults.tv" /> 
                    </div>

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

   .content-container{

        width: 100%;
        overflow-x: auto;

        &::-webkit-scrollbar-track:horizontal {
        background-color: rgba($color: #FFF, $alpha: 0); 
        }
    
        &::-webkit-scrollbar-thumb:horizontal {
            background-color: #FF080C; 
            border-radius: 5px; 
        }

        &::-webkit-scrollbar-thumb:hover {
            background-color: #f01616; 
        }


        .col{
            min-width: 200%;
        }


    }   

}

</style>