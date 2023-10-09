<script>
import HeaderComponent from "./components/HeaderComponent.vue";
import MainComponent from "./components/MainComponent.vue";
import axios from 'axios'
import {store} from './store.js'

export default {
  name: "App",
  components: {
    HeaderComponent,
    MainComponent,
  },
  data() {
    return {
      store,
    };
  },
  methods: {


    // **** funzione da rivedere perchè in teoria potrebbe funzionare ****
    // getResponse(){
    //   console.log('si si ')

    //   for (const key in this.store.searchResults) {

    //     this.store.searchResults[key]=[]

    //     if(this.store.searchText !=''& this.store.searchGenre==null){

    //       axios.get(`https://api.themoviedb.org/3/search/${key}`,{

    //         params:{
    //           api_key:this.store.apiKey,
    //           query:this.store.searchText,
    //         }

    //       }
    //       )
    //       .then(res=>{

    //         this.store.searchResults[key]=res.data.results

    //         // console.log(res)
    //       })
    //       .catch(err=>{
    //         if(this.store.searchResults[key].length==0){
    //           this.store.searchResults[key]=[]
    //         }
    //       })

    //     }

    //     else if(this.store.searchText !='' && this.store.searchGenre != null){

    //       console.log(1)
    //       axios.get(`https://api.themoviedb.org/3/search/${key}`,{

    //         params:{
    //           api_key:this.store.apiKey,
    //           query:this.store.searchText,
    //         }

    //         }
    //       )
    //       .then(resSearch=>{
    //         console.log(2)

    //         const resSearchArr=[]

    //         console.log(resSearch.data)


    //         for(let resSearchI=1;resSearchI <= resSearch.data.total_pages;resSearchI++){
    //           console.log('resSearchI',resSearchI)
    //           axios.get(`https://api.themoviedb.org/3/search/${key}`,{

    //             params:{
    //               api_key:this.store.apiKey,
    //               query:this.store.searchText,
    //               page:resSearchI
    //             }

    //             }
    //           )
    //           .then(res=>{
    //             console.log(3)

    //             resSearchArr.push(...res.data.results)
    //             console.log('res search arr riempito',resSearchArr)
    //           })
    //         }
    //         console.log(4)

    //         axios.get(`https://api.themoviedb.org/3/discover/${key}`,{

    //         params:{
    //           api_key:'ad9879a0909d7fd71a9675386cdfd2cc',
    //           with_genres:this.store.searchGenre

    //         }
          
    //         }
    //         )
    //         .then(resDiscover=>{
    //           console.log(5)

    //           const resDiscoverArr=[]

    //           console.log(resDiscover.data)

              

    //           for(let resDiscoverI=1;resDiscoverI <= resSearch.data.total_pages;resDiscoverI++){

    //             axios.get(`https://api.themoviedb.org/3/discover/${key}`,{

    //               params:{
    //                 api_key:'ad9879a0909d7fd71a9675386cdfd2cc',
    //                 with_genres:this.store.searchGenre,
    //                 page:resDiscoverI

    //               }

    //             }
    //             )
    //             .then(resD=>{

    //               console.log(6)


    //               resDiscoverArr.push(...resD.data.results)
    //               console.log('res discover arr riempito', resDiscoverArr)

    //               resDiscoverArr.forEach(elementDiscover=>{
    //                 resSearchArr.forEach(elementSearch=>{
    //                   if(elementDiscover.id==elementSearch.id){
    //                     this.searchResults[key].push(elementSearch)

    //                     console.log(7)

    //                   }
    //                 })
    //               })
    //             })
    //           }
    //         })
    //       })
    //     }
    //   }
    // },
    


    getResponse(){

      for (const key in this.store.searchResults) {

        if(this.store.searchText !=''){

          this.store.searchResults[key]=[]
    
          axios.get(`https://api.themoviedb.org/3/search/${key}`,{
    
            params:{
              api_key:this.store.apiKey,
              query:this.store.searchText,
            }
    
          }
          )
            
          .then(res=>{
  
            if(this.store.searchText!='' && this.store.searchGenre==null){
  
              this.store.searchResults[key].push(...res.data.results)
  
            }
  
            else if(this.store.searchText!='' && this.store.searchGenre!=null){
  
              res.data.results.forEach(element=>{
  
                if(element.genre_ids.includes(this.store.searchGenre)){
  
                  this.store.searchResults[key].push(element)
  
                }
  
              })
  
            }
      
            // console.log(res)
          })
          .catch(err=>{
            if(this.store.searchResults[key].length==0){
              this.store.searchResults[key]=[]
            }
          })
        }
        else{

          axios.get(`https://api.themoviedb.org/3/discover/${key}`,{

            params:{api_key:'ad9879a0909d7fd71a9675386cdfd2cc',
                    with_genres:this.store.searchGenre

            }
            })
            .then(res=>{

              console.log(res)

              this.store.searchResults[key].push(...res.data.results)

            })

        }
      }
      // this.filterResults()
    
    },

    getGenresLists(){
      for(let key in this.store.genresList){

        axios.get(`https://api.themoviedb.org/3/genre/${key}/list?api_key=ad9879a0909d7fd71a9675386cdfd2cc`)
            .then(res=>{
      
              this.store.genresList[key]=res.data.genres
      
              console.log(this.store.genresList[key])

              this.getFullGenresList()
            })

      }
    },
    getFullGenresList(){

      this.store.fullGenreslist.push(...this.store.genresList.movie)

      this.store.genresList.tv.forEach(element=>{

        if(!this.store.fullGenreslist.includes(element)){

          this.store.fullGenreslist.push(element)
          
        }

      })
      console.log(this.store.fullGenreslist)
    },
    getTrending(){

      for (const key in this.store.searchResults) {

          this.store.searchResults[key]=[]
          
          axios.get(`https://api.themoviedb.org/3/trending/${key}/week`,{
              params:{
                  api_key:this.store.apiKey,
                  language:'it',
              
              } 
          }
          )

          .then(res=>{

              for(let i = 0; i<8;i++){

                  this.store.searchResults[key].push(res.data.results[i])
              }

          }
          )
      }

    }

  },
  created(){
  },
  mounted(){
    this.getGenresLists()
    // this.getFullGenresList()
    this.getTrending()
  },
  
}
</script>

<template>
  <div >
    
    <HeaderComponent @search="getResponse()" @back-to-trending="getTrending()" />
    
    <MainComponent/>
      
  </div>
</template>

<style lang="scss">
@use "assets/scss/main" as *;


body{
  background-color: rgba(15, 15, 15, 1.0);
  min-height: 100vh;


}

</style>
