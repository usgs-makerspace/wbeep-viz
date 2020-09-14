import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        mapSVGRenderOnInitialLoad: false
    },
    mutations: {
        changeBooleanStateOnSVGMapRender(state){
            state.mapSVGRenderOnInitialLoad = true;
        }
    }
});
