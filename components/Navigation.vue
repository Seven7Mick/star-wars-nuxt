<template>
  <nav class="nav">
    <nuxt-link :to="page" class="nav__item"> Все герои </nuxt-link>

    <nuxt-link to="/favorites" class="nav__item"> Любимые герои </nuxt-link>
  </nav>
</template>

<script>
export default {
  computed:{
    page(){
      return `/main/${this.$store.state.currentPage}`
    }
  }
}
</script>

<style scoped>
.nav {
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav__item {
  padding: 5px 10px;
  font-size: 18px;
  line-height: 150%;
  background-color: rgba(173, 173, 173, 0.911);
  color: white;
  border: 1px solid rgb(136 136 136 / 77%);
  border-radius: 5px;
}
.nav__item:hover {
  box-shadow: 2px 2px 5px rgba(245, 245, 245, 0.623);
}
.nav__item:active {
  transform: scale(0.95);
}
</style>
