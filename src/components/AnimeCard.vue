<template>
  <div :class="['anime-card', { 'dark-mode': isDarkMode }]">
    <div class="image-container">
      <img 
        :src="anime.images?.jpg?.image_url || '/placeholder.jpg'" 
        :alt="anime.title"
        @error="handleImageError"
      >
      <div class="score-badge">
        ⭐ {{ anime.score?.toFixed(1) || 'N/A' }}
      </div>
      <button 
        class="favorite-btn"
        :class="{ 'is-favorite': isFavorite }"
        @click.stop="toggleFavorite"
        :aria-label="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
      >
        ♥
      </button>
      
      <!-- Tooltip de sinopsis -->
      <div class="synopsis-tooltip">
        <h4>{{ anime.title }}</h4>
        <p v-if="anime.synopsis">{{ truncateSynopsis(anime.synopsis) }}</p>
        <p v-else>Sinopsis no disponible</p>
        <div class="tooltip-footer">
          <span>{{ anime.year || 'Año desconocido' }}</span>
          <span>{{ anime.type || 'Tipo desconocido' }}</span>
        </div>
      </div>
    </div>
    <div class="info">
      <h3>{{ anime.title }}</h3>
      <div class="details">
        <span>{{ anime.year }}</span>
        <span>{{ anime.type }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    anime: {
      type: Object,
      required: true
    },
    isFavorite: {
      type: Boolean,
      default: false
    },
    isDarkMode: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    toggleFavorite() {
      this.$emit('toggle-favorite', this.anime)
    },
    handleImageError(e) {
      e.target.src = '/placeholder.jpg'
    },
    truncateSynopsis(text) {
      return text.length > 150 ? text.substring(0, 150) + '...' : text;
    }
  }
}
</script>

<style scoped>
/* Modo Claro */
.anime-card {
  --bg-color: #ffffff;
  --text-color: #333333;
  --border-color: #e0e0e0;
  --hover-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Modo Oscuro */
.anime-card.dark-mode {
  --bg-color: #1e293b;
  --text-color: #f8fafc;
  --border-color: #334155;
  --hover-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.anime-card {
  background: var(--bg-color);
  color: var(--text-color);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  cursor: pointer;
}

.anime-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--hover-shadow);
}

.image-container {
  position: relative;
  aspect-ratio: 3/4;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.score-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
}

.favorite-btn {
  position: absolute;
  top: 8px;
  left: 8px;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  font-size: 1rem;
  cursor: pointer;
  color: var(--is-favorite, #ccc);
}

.favorite-btn:hover {
  background: rgba(255, 255, 255, 0.9);
}

.info {
  padding: 12px;
}

.info h3 {
  font-size: 1rem;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.details {
  display: flex;
  gap: 8px;
  font-size: 0.8rem;
  color: var(--text-color);
  opacity: 0.8;
}

.favorite-btn {
  position: absolute;
  top: 8px;
  left: 8px;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  font-size: 1rem;
  cursor: pointer;
  color: var(--is-favorite, #ccc);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Estado normal */
.favorite-btn {
  color: #ccc;
  transform: scale(1);
}

/* Hover - Resaltado */
.favorite-btn:hover {
  background: rgba(255, 215, 215, 0.9);
  color: #ff6b6b;
  transform: scale(1.1);
}

/* Estado activo (click) */
.favorite-btn:active {
  transform: scale(0.95);
  background: rgba(255, 150, 150, 0.9);
}

/* Estado cuando es favorito */
.favorite-btn.is-favorite {
  color: #ff4757;
  animation: pulse 0.5s;
}

/* Animación de pulso para favoritos */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

/* Efecto al hacer hover cuando ya es favorito */
.favorite-btn.is-favorite:hover {
  color: #ff0000;
  background: rgba(255, 200, 200, 0.9);
}

/* Tooltip de sinopsis */
.image-container {
  position: relative;
  aspect-ratio: 3/4;
}

.image-container:hover .synopsis-tooltip {
  opacity: 1;
  transform: translateY(0);
}

.synopsis-tooltip {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.85);
  color: white;
  padding: 12px;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
  max-height: 70%;
  overflow-y: auto;
}

.synopsis-tooltip h4 {
  font-size: 1rem;
  margin-bottom: 8px;
  color: #ff4757;
}

.synopsis-tooltip p {
  font-size: 0.85rem;
  line-height: 1.4;
  margin-bottom: 8px;
}

.tooltip-footer {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #ccc;
}

/* Scrollbar personalizada para el tooltip */
.synopsis-tooltip::-webkit-scrollbar {
  width: 5px;
}

.synopsis-tooltip::-webkit-scrollbar-thumb {
  background: #ff4757;
  border-radius: 5px;
}

</style>