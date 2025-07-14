<template>
  <div :class="['search-container', { 'dark-mode': darkMode }]">
    <div class="search-header">
      <h1>Buscar Anime</h1>
      <button @click="toggleDarkMode" class="theme-toggle">
        {{ darkMode ? '☀️ Light' : '🌙 Dark' }}
      </button>
    </div>

    <div class="search-box">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Ej: Naruto, Attack on Titan..."
        @keyup.enter="search"
      >
      <button @click="search">Buscar</button>
    </div>

    <div class="filters">
      <select v-model="selectedType">
        <option value="">Todos los tipos</option>
        <option value="tv">TV</option>
        <option value="movie">Película</option>
      </select>
      
      <select v-model="selectedStatus">
        <option value="">Todos los estados</option>
        <option value="airing">En emisión</option>
        <option value="complete">Completado</option>
      </select>
    </div>

    <div v-if="loading" class="loading">Cargando...</div>
    
    <div v-else class="results-grid">
      <AnimeCard
        v-for="anime in animeList"
        :key="anime.mal_id"
        :anime="anime"
        :is-dark-mode="darkMode"
        :is-favorite="isFavorite(anime.mal_id)"
        @toggle-favorite="toggleFavorite"
      />
    </div>
  </div>
</template>

<script>
import AnimeCard from '@/components/AnimeCard.vue'
import JikanAPI from '@/api/jikan'
import { getFavorites, addFavorite, removeFavorite } from '@/utils/localStorage'

export default {
  components: { AnimeCard },
  data() {
    return {
      darkMode: true,
      searchQuery: '',
      selectedType: '',
      selectedStatus: '',
      animeList: [],
      loading: false,
      favorites: getFavorites()
    }
  },
  methods: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode
      document.documentElement.classList.toggle('dark', this.darkMode)
    },
    async search() {
      if (!this.searchQuery.trim()) return
      
      this.loading = true
      try {
        const params = {
          query: this.searchQuery,
          type: this.selectedType,
          status: this.selectedStatus
        }
        const response = await JikanAPI.searchAnime(params)
        this.animeList = response.data || []
      } catch (error) {
        console.error(error)
        this.animeList = []
      } finally {
        this.loading = false
      }
    },
    isFavorite(malId) {
      return this.favorites.some(fav => fav.mal_id === malId)
    },
    toggleFavorite(anime) {
      if (this.isFavorite(anime.mal_id)) {
        removeFavorite(anime.mal_id)
      } else {
        addFavorite(anime)
      }
      this.favorites = getFavorites()
    }
  }
}
</script>

<style scoped>
.search-container {
  --bg-color: #1e293b;
  --text-color: #f8fafc;
  --input-bg: #334155;
  --border-color: #475569;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.search-container:not(.dark-mode) {
  --bg-color: #ffffff;
  --text-color: #1e293b;
  --input-bg: #f1f5f9;
  --border-color: #e2e8f0;
}

.search-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.theme-toggle {
  background: var(--input-bg);
  color: var(--text-color);
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.search-box {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.search-box input {
  flex: 1;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  background: var(--input-bg);
  color: var(--text-color);
}

.search-box button {
  padding: 10px 20px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.filters select {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  background: var(--input-bg);
  color: var(--text-color);
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.loading {
  text-align: center;
  padding: 40px;
  color: var(--text-color);
}
</style>