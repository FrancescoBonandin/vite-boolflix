<script>
import{store} from '../store.js'
import axios from 'axios';

export default {
    name: "HeaderComponent",
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
    <header>

        <div class="container">

            <div class="row flex-wrap justify-content-between align-items-center">

                <div class="col-auto">

                    <h1 class="logo">
                        BOOLFLIX
                    </h1>

                </div>

                <div class="col">
                    
                    <form @submit.prevent="$emit('search')" class="row row-cols-4 justify-content-end"  action="">
                        <div class="col-auto">
                            <input v-model="store.searchText" class="form-control" type="search" name="search" id="">
                        </div>

                        <!-- <div class="col-auto">
                            <select v-if="store.searchText.trim() != ''" v-model="store.searchGenre"  class="form-select" aria-label="Default select example">
                                <option selected :value="null"></option>
                                <option v-for="(singleGenreOption,i) in store.genresList.movie" :key="i"
                                    :value=singleGenreOption.name>{{singleGenreOption.name}}</option>
                                
                                <option v-for="(singleGenreOption,i) in store.genresList.tv" :key="i"
                                    :value=singleGenreOption.name>{{singleGenreOption.name}}</option>
                                
                            </select>
                        </div> -->

                        <div class="col-auto">
                            
                            <select   v-model="store.searchGenre" class="form-select" aria-label="Default select example">
                                    
                                <option selected :value="null"></option>

                                <option v-for="(singleGenreOption,i) in store.fullGenreslist" :key="i"
                                        :value=singleGenreOption.id>

                                    {{singleGenreOption.name}}

                                </option>
                                
                            </select>
                          
                        </div>
                    

                        <div class="col-auto">
                            <button class="btn btn-danger"  type="submit">
                                Search
                            </button>
                        </div>
                        
                        <div class="col-auto">
                            <button type="reset" @click="$emit('back-to-trending')" class="btn btn-success" >
                                Back to Trending
                            </button>
                        </div>


    
                    </form>
    
                </div>

            </div>

            
        </div>

    </header>
</template>

<style lang="scss" scoped>

header{
    background-color: black;

    .logo{
        font-family:fantasy;
        color: red;
        text-shadow: 1px 1px 1px rgba(255, 255, 255, 1),-1px -1px 1px rgba(255, 255, 255, 1),0px 1px 1px rgba(255, 255, 255, 1),
                     1px -1px 1px rgba(255, 255, 255, 1),-1px 1px 1px rgba(255, 255, 255, 1),0px -1px 1px rgba(255, 255, 255, 1);
        letter-spacing: 2px;
    }
    
}
</style>