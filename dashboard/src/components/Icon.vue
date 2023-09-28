<script>
import { Icon } from '@iconify/vue'
export default {
    name: 'Icones',
    components: {
        Icon
    },
    props: {
        type: {
            type: String,
            required: true
        },
        size: {
            type: String,
            required: false
        }
    },
    computed: {
        iconData() {
            return `tabler:${this.type}`
        }
    },
}
</script>

<template>
    <Icon :icon="iconData" :width="size" :height="size" />
</template>