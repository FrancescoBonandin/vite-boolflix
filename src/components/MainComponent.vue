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
        getStarVote(element){

           const stars= parseInt(element.vote_average / 2)
           if(stars >=0 && stars <=1){
            stars=1
           }
           else if(stars>4 && stars<=5){
            stars=5
           }


           return stars
        }
    },
    computed:{
        imgPathPrefix(){
           let imgUrl='https://image.tmdb.org/t/p/w500'
            return imgUrl
        },
     
    }
}
</script>

<template>
    <main>
        <div class="container">

            <h2 v-if="store.searchResults.movies.length > 0">Movies</h2>

            <div class="row">

                <div v-for="(singleMovie,i) in store.searchResults.movies" :key="i" class="col-auto">

                    <div class="card">

                        <div class="card-img-top">
                            <img :src="`${imgPathPrefix}${singleMovie.poster_path}`" alt="">
                        </div>
    
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

                        <p>voto: 

                            <font-awesome-icon v-for="x in getStarVote(singleMovie)" icon="fa-solid fa-star"/>
                            
                            <font-awesome-icon v-for="y in (5 - getStarVote(singleMovie))" icon="fa-regular fa-star"/>
                            
                        </p>
                        
                    </div>

                </div>

            </div>

            <h2 v-if="store.searchResults.tvSeries.length > 0">TV series</h2>

            <div class="row row-cols-4">
                
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

.card{
    border:solid 1px red;
    .card-img-top{
        width: 50%;
        border: solid 1px blue;
        img{
            width: 100%;
    
        }
    }
}

</style>