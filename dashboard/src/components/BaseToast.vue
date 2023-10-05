<script>
import { defineToastComponent } from 'vue-my-toasts'
export default defineToastComponent({
    name: 'Toast',
    props: {
        title: {
            type: [String, Boolean],
            required: false,
            default: false,
        },
    },
    computed: {
        color() {
            switch (this.type) {
            case 'base':
                return 'info'
            case 'warning':
                return 'warning'
            case 'error':
                return 'danger'
            case 'success':
                return 'success'
            default:
                return 'info'
            }
        },
        icon() {
            switch (this.type) {
            case 'base':
                return 'info-circle-fill'
            case 'warning':
                return 'exclamation-triangle-fill'
            case 'error':
                return 'exclamation-circle-fill'
            case 'success':
                return 'check-circle-fill'
            default:
                return 'info-circle-fill'
            }
        },
    },
})
</script>

<template>
    <div class="alert toast-alert d-flex align-items-center alert-dismissible" :class="`alert-snipe-${color}`" role="alert">
        <i :class="`bi-${icon}`" class="bi me-2"></i>
        <div>{{ message }}</div>
        <button type="button" class="close btn-close" @click="$emit('remove')"></button>
        <div class="position-relative position-absolute bottom-0 start-0 w-100">
            <div class="progress-bar bg-white" style="height: 1px;" :style="{ width: percentageElapsed + '%', }" />
        </div>
    </div>
</template>

<style lang="scss">
$alert-color: v-bind('color');

.toast-alert {
  background-image: linear-gradient(to right, var(--snipe-alert-bg), var(--snipe-alert-bg)),
    linear-gradient(to right, var(--snipe-body-bg), var(--snipe-body-bg));
}

.progress-bar {
  background: #fff !important;
}
</style>