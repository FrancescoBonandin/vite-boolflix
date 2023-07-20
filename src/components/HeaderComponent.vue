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

                <div class="col-auto">
    
                    <form @submit.prevent="$emit('search')" action="">
    
                        <input v-model="store.searchText" type="search" name="search" id="">
    
                        <button type="submit">
                            search
                        </button>
    
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
        text-shadow: 2px 2px 1px rgba(255, 255, 255, 1),-2px -2px 1px rgba(255, 255, 255, 1),0px 2px 1px rgba(255, 255, 255, 1),
                     2px -2px 1px rgba(255, 255, 255, 1),-2px 2px 1px rgba(255, 255, 255, 1),0px -2px 1px rgba(255, 255, 255, 1);
        letter-spacing: 3px;
    }
}
</style>