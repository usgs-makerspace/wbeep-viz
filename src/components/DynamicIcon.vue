<template>
    <component :is="dynamicIcon" />
</template>
<script>
export default {
    name: "DynamicIcon",
    props: {
        icon: {
            type: String,
            required: true,
        },
    },
    computed: {
        dynamicIcon () {
            this.icon;
            return () => import(
                /* webpackChunkName: "icons" */
                /* webpackMode: "lazy-once" */ 
                `@/assets/images/icons/${this.icon}.svg`
            )
        }
    }
}
</script>