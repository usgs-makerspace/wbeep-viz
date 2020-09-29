<template>
  <component :is="dynamicBarChart" />
</template>
<script>
export default {
    name: "DynamicBarChart",
    props: {
        barchart: {
            type: String,
            required: true,
        },
    },
    computed: {
        dynamicBarChart () {
            this.barchart;
            return () => import(
                /* webpackChunkName: "barcharts" */
                /* webpackMode: "lazy-once" */ 
                `@/assets/wuBarSVGs/${this.barchart}.svg`
            )
        }
    }
}
</script>