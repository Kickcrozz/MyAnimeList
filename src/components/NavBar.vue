<template>
  <nav class="navbar" aria-label="Main navigation">
    <div class="container">
      <router-link to="/" class="logo" aria-label="Home">AnimeSearch</router-link>
      <div class="nav-links">
        <router-link to="/" aria-label="Inicio">Inicio</router-link>
        <router-link to="/search" aria-label="Buscar">Buscar</router-link>
        <router-link to="/favorites" aria-label="Favoritos">Favoritos</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>
.navbar {
  background: #2c3e50;
  padding: 1rem 0;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
}

.logo {
  font-weight: bold;
  font-size: 1.5rem;
  color: white;
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.logo:hover {
  opacity: 0.8;
}

.nav-links a {
  color: white;
  margin-left: 1.5rem;
  text-decoration: none;
  transition: color 0.3s ease;
  padding: 0.5rem 0;
  position: relative;
}

.nav-links a:hover {
  color: #42b983;
}

.nav-links a.router-link-exact-active {
  color: #42b983;
  font-weight: bold;
}

/* Optional: Add an underline effect for active link */
.nav-links a.router-link-exact-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #42b983;
}
</style>