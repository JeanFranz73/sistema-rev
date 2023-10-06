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
    <footer class="footer position-absolute">
        <div class="row g-0 justify-content-between align-items-center h-100">
            <div class="col-12 col-sm-auto text-center">
                <p class="mb-0 mt-2 mt-sm-0 text-900">Sistema de Revendas</p>
            </div>
            <div class="col-12 col-sm-auto text-center">
                <p class="mb-0 text-600">v0.1</p>
            </div>
        </div>
    </footer>
</template>
