<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <h1>Bienvenido a AnimeSearch</h1>
        <p>Descubre tus animes favoritos, explora recomendaciones y guarda tus títulos preferidos.</p>
        <router-link to="/search" class="cta-button">Buscar Animes</router-link>
      </div>
    </section>

    <section class="features">
      <div class="feature-card">
        <h2>Explora</h2>
        <p>Encuentra animes por género, año o popularidad.</p>
      </div>
      <div class="feature-card">
        <h2>Favoritos</h2>
        <p>Guarda tus animes preferidos para verlos más tarde.</p>
      </div>
      <div class="feature-card">
        <h2>Actualizado</h2>
        <p>Accede a los últimos lanzamientos y tendencias.</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
};
</script>

<style scoped>
.home {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.hero {
  text-align: center;
  padding: 4rem 1rem;
  background: linear-gradient(135deg, #42b983 0%, #2c3e50 100%);
  color: white;
  border-radius: 10px;
  margin-bottom: 2rem;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-button {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background: white;
  color: #2c3e50;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: transform 0.3s, background 0.3s;
}

.cta-button:hover {
  transform: translateY(-3px);
  background: #f0f0f0;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.feature-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card h2 {
  color: #42b983;
  margin-bottom: 0.5rem;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2rem;
  }
  .features {
    grid-template-columns: 1fr;
  }
}
</style>