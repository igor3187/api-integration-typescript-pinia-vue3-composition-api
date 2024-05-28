<script setup lang="ts">
import { RouterView } from 'vue-router'
import GlobalLoader from 'vue-global-loader/GlobalLoader.vue'
import CircleSpinner from 'vue-global-loader/CircleSpinner.vue'
import { Notivue, Notification } from 'notivue'
import Navbar from '@/components/Navbar.vue'
</script>

<template>
    <Navbar />
    <GlobalLoader>
        <CircleSpinner />
    </GlobalLoader>
    <RouterView />
    <Notivue v-slot="item">
        <Notification :item="item" />
    </Notivue>
</template>

<style scoped>

</style>
