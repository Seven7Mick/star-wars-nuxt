<template>
  <div class="favorite">
    <Card
      v-for="character of favoritesCharacters"
      :key="character.id"
      :character="character"
      class="favorite__card"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      favoritesCharacters: [],
    };
  },
  computed: {
    ...mapGetters(['getFavoritesCharacters']),
  },
  watch: {
    getFavoritesCharacters: function (newVal) {
      this.favoritesCharacters = newVal
    },
  },
  mounted() {
    this.favoritesCharacters = this.getFavoritesCharacters.filter(
      (el) => el.favorite === true
    );
  },
};
</script>

<style scoped>
.favorite {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
}
.favorite__card {
  margin: 0 5px 15px 5px;
}
</style>