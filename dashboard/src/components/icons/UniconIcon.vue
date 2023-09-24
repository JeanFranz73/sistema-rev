<script>

export default {
    name: 'UniconIcon',
    props: {
        icon: {
            type: String,
            required: true
        }
    },
    computed: {
        iconClass() {
            return `uil-${this.icon}`
        }
    }
}
</script>

<template>
    <i class="uil" :class="iconClass"></i>
</template>