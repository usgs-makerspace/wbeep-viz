import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        mapSVGRenderOnInitialLoad: false,
        tabToOpen: "Storage"
    },
    mutations: {
        changeBooleanStateOnSVGMapRender(state){
            state.mapSVGRenderOnInitialLoad = true;
        },
        changeTabToBeOpened(state, tab){
            console.log("Ran Function");
            state.tabToOpen = tab;
        }
    }
});
