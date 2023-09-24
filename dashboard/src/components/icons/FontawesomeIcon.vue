<script>

export default {
    name: 'FontawesomeIcon',
    props: {
        icon: {
            type: String,
            required: true
        }
    },
    computed: {
        iconClass() {
            return `fa-${this.icon}`
        }
    }
}
</script>

<template>
    <i class="fas" :class="iconClass"></i>
</template>