<script>
import DefaultHeader from '@/layouts/header/DefaultHeader.vue'

export default {
    components: {
        DefaultHeader,
    }
}
</script>

<template>
    <main>
        <default-header />
        <div class="content">
            <router-view />
        </div>
    </main>
</template>
