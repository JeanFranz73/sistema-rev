<script>
export default {
    name: 'FeatherIcon',
    props: {
        icon: {
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
            return this.icon
        }
    },
}
</script>

<template>
    <i :data-feather="iconData" :width="size" :height="size"></i>
</template>