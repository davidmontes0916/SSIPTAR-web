<template>
  <div class="home-page">
    <h2>Bienvenido a SSIPTAR</h2>
    <p>Esta es tu página de inicio. Aquí podrás acceder a los módulos disponibles desde el menú lateral.</p>
  </div>
</template>

<script setup>
// Por ahora no necesitas lógica adicional.
// Más adelante puedes importar stores o componentes aquí.
</script>

<style scoped>
.home-page {
  padding: 2rem;
  font-family: var(--font-primary);
  color: var(--color-text);
}

.home-page h2 {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: 1rem;
}

.home-page p {
  font-size: var(--font-size-md);
  color: var(--color-text-secondary);
}
</style>
