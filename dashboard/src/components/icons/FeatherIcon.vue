<script>

export default {
    name: 'FontawesomeIcon',
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
            return this.type
        }
    }
}
</script>

<template>
    <i :data-feather="iconData" :width="size" :height="size"></i>
</template>