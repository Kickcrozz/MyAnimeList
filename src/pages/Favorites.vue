<template>
  <div :class="['favorites-container', { 'dark-mode': darkMode }]">
    <div class="header">
      <h1>Mis Favoritos</h1>
      <button @click="toggleDarkMode" class="theme-toggle">
        {{ darkMode ? '☀️ Light' : '🌙 Dark' }}
      </button>
    </div>

    <div v-if="favorites.length === 0" class="empty">
      <p>No tienes animes favoritos aún</p>
      <router-link to="/search">Buscar animes</router-link>
    </div>

    <div v-else class="favorites-grid">
      <AnimeCard
        v-for="anime in favorites"
        :key="anime.mal_id"
        :anime="anime"
        :is-dark-mode="darkMode"
        :is-favorite="true"
        @toggle-favorite="removeFavorite"
      />
    </div>
  </div>
</template>

<script>
import AnimeCard from '@/components/AnimeCard.vue'
import { getFavorites, removeFavorite } from '@/utils/localStorage'

export default {
  components: { AnimeCard },
  data() {
    return {
      darkMode: true,
      favorites: getFavorites()
    }
  },
  methods: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode
      document.documentElement.classList.toggle('dark', this.darkMode)
    },
    removeFavorite(anime) {
      removeFavorite(anime.mal_id)
      this.favorites = getFavorites()
    }
  }
}
</script>

<style scoped>
.favorites-container {
  --bg-color: #1e293b;
  --text-color: #f8fafc;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.favorites-container:not(.dark-mode) {
  --bg-color: #ffffff;
  --text-color: #1e293b;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.theme-toggle {
  background: var(--bg-color);
  color: var(--text-color);
  border: 1px solid var(--text-color);
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.empty {
  text-align: center;
  padding: 40px;
  color: var(--text-color);
}

.empty a {
  color: #3b82f6;
  text-decoration: none;
}
</style>