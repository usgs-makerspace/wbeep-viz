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
                /* webpackChunkName: "icons" */
                /* webpackMode: "lazy-once" */ 
                `@/assets/images/barchart/${this.barchart}.svg`
            )
        }
    }
}
</script>