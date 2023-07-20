<script>
import HeaderComponent from "./components/HeaderComponent.vue";
import MainComponent from "./components/MainComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
import axios from 'axios'
import {store} from './store.js'

export default {
  name: "App",
  components: {
    HeaderComponent,
    MainComponent,
    FooterComponent,
  },
  data() {
    return {
      store,
    };
  },
  methods: {
    getResponse(){
      axios.get('https://api.themoviedb.org/3/search/movie',{

        params:{
          api_key:this.store.apiKey,
          query:this.store.searchText,
        }

      }
      )
      .then(res=>{

        this.store.searchResults.movies=res.data.results

        console.log(res)
      })
      .catch(err=>{
        if(this.store.searchResults.movies.length==0){
          this.store.searchResults.movies=[]
        }
      })
  
    axios.get('https://api.themoviedb.org/3/search/tv',{

      params:{
        api_key:this.store.apiKey,
        query:this.store.searchText,
      }

    }
    )
    .then(res=>{

      this.store.searchResults.tvSeries=res.data.results

      console.log(res)
    })
    .catch(err=>{
        if(this.store.searchResults.tvSeries.length==0){
          this.store.searchResults.tvSeries=[]
        }
      })
        
    },

  
  },
  created(){

    axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=ad9879a0909d7fd71a9675386cdfd2cc')
        .then(res=>{

          this.store.genresList=res.data.genres

          console.log(this.store.genresList)
        })
  }
}
</script>

<template>
  <div >
    
    <HeaderComponent @search="getResponse" />
  
    <MainComponent />
  
    <FooterComponent />
    
  </div>
</template>

<style lang="scss">
@use "assets/scss/main" as *;
body{
  background-color: rgba(15, 15, 15, 1.0);
  min-height: 100vh;
}
</style>
