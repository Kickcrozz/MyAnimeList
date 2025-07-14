<template>
  <div id="app">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import { onMounted } from 'vue'
import NavBar from '@/components/NavBar.vue'

export default {
  components: { NavBar },
  setup() {
    onMounted(() => {
      if (localStorage.getItem('darkMode') === 'true' || 
          (!('darkMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    })
  }
}
</script>

<style>
/* Estilos globales */
body {
  font-family: 'Inter', sans-serif;
  background: #f5f7fa;
  margin: 0;
  padding: 0;
}

#app {
  min-height: 100vh;
}
</style>