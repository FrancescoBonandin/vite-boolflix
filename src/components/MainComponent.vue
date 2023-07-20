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
            fallbackImg:'../assets/img/posternotfound.png'
        }
    },
    methods: {

        getImagePath(){

            return new URL(this.fallbackImg, import.meta.url).href

        },

        getStarVote(element){
            
            let stars = parseInt(element.vote_average / 2)

                if(stars >=0 && stars <=1){
                    stars=1
                }
                else if(stars>4 && stars<=5){
                    stars=5
                }


                return stars
        },
        imgPath(element){
            let imgUrl=`https://image.tmdb.org/t/p/w342${element.poster_path}`

            axios.get(imgUrl)
            .then(res=>{
                return res
            })
            .catch(err=>{
                return this.fallbackImg
            })
        },

    },
    computed:{
        imgPathPrefix(){
           let imgUrl='https://image.tmdb.org/t/p/w342'
            return imgUrl
        },
     
    }
}
</script>

<template>
    <main>
        <div class="container">

            <h2 v-if="store.searchResults.movies.length > 0">Movies</h2>

            <div class="row row-cols-4 flex-wrap align-items-start">

                <div v-for="(singleMovie,i) in store.searchResults.movies" :key="i" class="col my-3">

                    <div class="card">

                        <div class="card-img-top">
                            <img :src="singleMovie.poster_path==null? getImagePath():`${imgPathPrefix}${singleMovie.poster_path}`"  alt="failed to load">
                        </div>

                        <div class="card-body">

                            <p v-if="singleMovie.title!=singleMovie.original_title">titolo:
                                <span>
                                    {{ singleMovie.title }}
                                </span>
                            </p>
    
                            <p>titolo originale:
                                <span>
                                    {{ singleMovie.original_title }}
                                </span>
                            </p>
                            
                            <p>lingua:
    
                                <span v-if="singleMovie.original_language!=''">
                                    <CountryFlag :country="singleMovie.original_language=='en'? 'gb':singleMovie.original_language " size="small"/>
                                </span>
        
                                <span v-else>
                                    
                                    {{ singleMovie.original_language }}
        
                                </span>
                            </p>
    
                            <p v-if="store.searchResults.movies.length > 0">voto: 
    
                                <font-awesome-icon v-for="x in getStarVote(singleMovie)" icon="fa-solid fa-star" class="full-star-color" />
    
                                <font-awesome-icon v-for="y in (5 - getStarVote(singleMovie))" icon="fa-regular fa-star" class="empty-star-color"  />
                                
                            </p>

                            <p v-if="singleMovie.overview!=''">overview:
                                <span>
                                    {{singleMovie.overview}}
                                </span>
                            </p>

                        </div>
    
                        
                    </div>

                </div>

            </div>

            <h2 v-if="store.searchResults.tvSeries.length > 0">TV series</h2>

            <div class="row row-cols-4 flex-wrap align-items-start">
                
                <div v-for="(singleSerie,i) in store.searchResults.tvSeries" :key="i" class="col my-3">

                    <div class="card">

                        <div class="card-img-top">
                            <img  :src="singleSerie.poster_path==null? getImagePath():`${imgPathPrefix}${singleSerie.poster_path}`" alt="failed to load">
                        </div>

                        <div class="card-body">

                            <p v-if="singleSerie.title!=singleSerie.original_title">titolo: 
                                <span>
                                    {{ singleSerie.name }}
                                </span>
                            </p>
        
                            <p>titolo originale:
                                <span>
                                    {{ singleSerie.original_name }}
                                </span>
                            </p>
                            
                            <p>lingua:

                                <span v-if="singleSerie.original_language!=''">

                                    <CountryFlag :country="singleSerie.original_language=='en'? 'gb':singleSerie.original_language " size="small"/>

                                </span>
        
                                <span v-else>
                                    
                                    {{ singleSerie.original_language }}
        
                                </span>

                            </p>
        
                            <p v-if="store.searchResults.movies.length > 0">voto: 
                                
                                <font-awesome-icon v-for="x in getStarVote(singleSerie)" icon="fa-solid fa-star" class="full-star-color" />
        
                                <font-awesome-icon v-for="y in (5 - getStarVote(singleSerie))" icon="fa-regular fa-star" class="empty-star-color"  />
        
                            </p>

                            <p v-if="singleSerie.overview!=''">overview:
                                <span>
                                    {{singleSerie.overview}}
                                </span>
                            </p>

                        </div>
                        
                    </div>
                    
                </div>

            </div>

        </div>

    </main>
</template>

<style lang="scss" scoped>

main{
   background-color: rgba(90, 90, 90, 1);
   h2{
    color:red;
   }
}

.card{
    border:solid 1px red;

    position: relative;
    .card-img-top{
        width: 100%;
        border: solid 1px blue;


        img{
            width: 100%;
            aspect-ratio: 257/385;
    
        }
    }
    
    .card-body{
        position: absolute;
        background-color: rgba($color: #000000, $alpha: 0.7);
        width:100%;
        height:100%;
        display:none;
        p{
            color: red;
            span{
                color: white;
            }
        }
    }
    
    &:hover{
        .card-body{
            display: block;

        }
    }
}

.full-star-color{
    color: gold;
}

.empty-star-color{
    color: goldenrod;
}
</style>