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

            <div class="row">

                <div class="col">


                </div>

            </div>

            <div class="row">

                <div class="col">

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
</style>