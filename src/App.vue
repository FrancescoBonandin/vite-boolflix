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
        
    },
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
</style>
