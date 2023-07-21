import {reactive} from 'vue'

export const store = reactive({
    apiKey:'ad9879a0909d7fd71a9675386cdfd2cc',
    searchText:'',
    searchGenre:null,
    genresList:{
        movie:[],
        tv:[]
    },
    popular:{
        movie:[],
        tv:[]
    },

    searchResults:{
        movie:[],
        tv:[],
    },
  
})