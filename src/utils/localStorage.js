export const getFavorites = () => {
  try {
    const favorites = localStorage.getItem('anime-favorites')
    return favorites ? JSON.parse(favorites) : []
  } catch (error) {
    console.error('Error reading favorites:', error)
    return []
  }
}

export const addFavorite = (anime) => {
  try {
    const favorites = getFavorites()
    if (!favorites.some(fav => fav.mal_id === anime.mal_id)) {
      const updated = [...favorites, anime]
      localStorage.setItem('anime-favorites', JSON.stringify(updated))
      return true
    }
    return false
  } catch (error) {
    console.error('Error adding favorite:', error)
    return false
  }
}

export const removeFavorite = (malId) => {
  try {
    const favorites = getFavorites()
    const updated = favorites.filter(anime => anime.mal_id !== malId)
    localStorage.setItem('anime-favorites', JSON.stringify(updated))
    return true
  } catch (error) {
    console.error('Error removing favorite:', error)
    return false
  }
}