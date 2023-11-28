<script>
import { Icon } from '@iconify/vue'
export default {
    name: 'Icones',
    components: {
        Icon
    },
    computed: {
        iconData() {
            return `tabler:${this.type}`
        }
    },
    props: {
        type: {
            type: String,
            required: true
        },
        size: {
            type: String,
            required: false
        },
        color: {
            type: String,
            required: false
        }
    },
}
</script>

<template>
    <Icon :icon="iconData" :width="size" :height="size" :color="color" />
</template>