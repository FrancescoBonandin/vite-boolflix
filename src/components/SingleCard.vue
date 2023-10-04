<script>
import {store} from '../store.js'
import CountryFlag from 'vue-country-flag-next'
import axios from 'axios'

export default {
    components:{
        CountryFlag
    },
    props:{
        singleElement:Object,
        singleIndex:Number,
        searchResultsArr:Array,
    },
    emits:['got-genres'],
    data() {
        return {
            store,
            fallbackImg:'../assets/img/posternotfound.png',
            cast:[],
            genres:[],
        }
    },
    methods: {

        getImagePath(){

            return new URL(this.fallbackImg, import.meta.url).href

        },

        getSingleElementCast(){
            let location = null

            for (let key in this.store.searchResults) {
                
                for(let index=0;index<this.store.searchResults[key].length;index++){

                    if(this.store.searchResults[key]==this.store.searchResults.movie && this.singleElement==this.store.searchResults[key][index]){
                        location = 'movie'
                    }

                    else if(this.store.searchResults[key]==this.store.searchResults.tv && this.singleElement==this.store.searchResults[key][index]){
                        location = 'tv'
                    }
                }
            }

            axios.get(`https://api.themoviedb.org/3/${location}/${this.singleElement.id}/credits?api_key=ad9879a0909d7fd71a9675386cdfd2cc`)
                .then(res=>{
                const castArray=res.data.cast

                for(let i=0;i<5;i++) {
                    this.cast.push(castArray[i].name)
                }
                
                // console.log(`cast${this.singleElement.id}`,res)
                }
                )
                .catch(err=>{
                    if(this.cast.length == 0){
                        this.cast = ['No results found']
                    }
                }
                )
        },
        getGenres(){
            this.genres=[]
            for (const key in this.store.genresList) {
               
                for(let i = 0; i < this.store.genresList[key].length; i++){
    
                    for(let index = 0; index < this.singleElement.genre_ids.length; index++){
    
                        if(this.store.genresList[key][i].id==this.singleElement.genre_ids[index]){

                            if(!this.genres.includes(this.store.genresList[key][i].name)){

                                this.genres.push(this.store.genresList[key][i].name)

                            }
                        }
                    }
                }
                
            }
        },
        
        addTheGenres(){
            
           this.searchResultsArr[this.singleIndex].genres=[]
           this.searchResultsArr[this.singleIndex].genres.push(...this.genres)

        }
        
    },
    computed:{
        imgPathPrefix(){
            let imgUrl='https://image.tmdb.org/t/p/w342'
            return imgUrl
        },
        starVote(){
            
            let stars = Math.ceil(this.singleElement.vote_average / 2)
            stars
            if(stars >=0 && stars <=1){
                stars=1
            }
         
            return stars
        },
        convertToIso(){
            if (this.singleElement.original_language=='en'){
    
                return 'gb'
            }
    
            else if (this.singleElement.original_language=='ja'){
    
                return 'jp'
            }
    
            else if (this.singleElement.original_language=='ko'){
    
                return 'kor'
            }

            else return this.singleElement.original_language
        },
     
    },
    created(){
    },
    mounted(){
        this.getSingleElementCast()
        this.getGenres()
        this.addTheGenres()
       

    }
}
</script>


<template>

<div class="card">

    <div class="card-img-top">
        <img :src="singleElement.poster_path==null ? getImagePath():`${imgPathPrefix}${singleElement.poster_path}`"  alt="failed to load">
    </div>

    <div class="card-body">

        <p v-if="singleElement.title!=singleElement.original_title">titolo:
            <span>
                {{ singleElement.title ?? singleElement.name }}
            </span>
        </p>

        <p>titolo originale:
            <span>
                {{ singleElement.original_title ?? singleElement.original_name }}
            </span>
        </p>

        <p>cast:
            <span v-for="(actor,i) in cast" :key='i'>

                <span>{{actor}}</span>

                <span v-if="i < cast.length-1 ">
                    ,
                </span>
            </span>
        </p>
        
        <p>genres:
            <span v-for="(singleGenre,i) in genres" :key='i'>

                <span>{{singleGenre}}</span>

                <span v-if="i < genres.length-1 ">
                    ,
                </span>
            </span>
        </p>
        
        <p>lingua:

            <span>
                <CountryFlag :country="convertToIso" size="small"/>
            </span>

            <span>
                
                {{ singleElement.original_language }}

            </span>
        </p>

        <p v-if="store.searchResults.movie.length > 0">voto: 

            <font-awesome-icon v-for="x in starVote" icon="fa-solid fa-star" class="full-star-color" />

            <font-awesome-icon v-for="y in (5 - starVote)" icon="fa-regular fa-star" class="empty-star-color"  />
            
        </p>

        <p v-if="singleElement.overview!=''">overview:
            <span>
                {{singleElement.overview}}
            </span>
        </p>

    </div>

</div>

</template>

<style lang="scss" scoped>
.card{
    border:solid 1px red;
    overflow: hidden;
    position: relative;
    .card-img-top{
        width: 100%;
        overflow: hidden;
        img{
            width: 100%;
            aspect-ratio: 257/385;
    
        }
    }
    
    &:hover{
        .card-body{
            display: block;

        }
    }
    .card-body{
        position: absolute;
        background-color: rgba($color: #000000, $alpha: 0.7);
        width:100%;
        height:100%;
        display:none;
        overflow: auto;

        >*::first-letter{
            text-transform: capitalize;
        }

        &::-webkit-scrollbar {
            width: 0.5rem;
        }

        &::-webkit-scrollbar-track {
            background-color: #2C2C31;
            border-radius: 4px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: red;
            border-radius: 4px;
        }

        p{
            color: red;
            span{
                color: white;
            }
        }
        .full-star-color{
            color: gold;
        }
        
        .empty-star-color{
            color: goldenrod;
        }
    }
    
}

</style>
