import axios from 'axios'

const API_BASE_URL = 'https://api.jikan.moe/v4'

export default {
  async searchAnime(params) {
    try {
      const response = await axios.get(`${API_BASE_URL}/anime`, {
        params: {
          q: params.query,
          genres: params.genres?.join(','),
          status: params.status,
          type: params.type,
          page: params.page || 1,
          limit: 20,
          order_by: 'score',
          sort: 'desc'
        }
      })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error fetching anime')
    }
  },

  async getGenres() {
    try {
      const response = await axios.get(`${API_BASE_URL}/genres/anime`)
      return response.data.data
    } catch (error) {
      throw new Error('Error fetching genres')
    }
  }
}