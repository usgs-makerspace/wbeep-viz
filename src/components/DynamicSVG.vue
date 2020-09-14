<template>
    <component :is="dynamicSVG" />
</template>
<script>
export default {
    name: "DynamicSVG",
    props: {
        svg: {
            type: String,
            required: true,
        },
    },
    computed: {
        dynamicSVG() {
            this.svg;
            return () => import(
                /* webpackChunkName: "MapSVGs" */
                /* webpackMode: "lazy-once" */ 
                `@/assets/wuMapSVGs/${this.svg}.svg`
            )
        }
    },
    mounted(){
        this.$nextTick(function () {
            this.$store.commit('changeBooleanStateOnSVGMapRender');
        });
    }
}
</script>
