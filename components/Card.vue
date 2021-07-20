<template>
  <div class="card">
    <img class="card__img" :src="fetchImgCharacter" :alt="character.name" />
    <div class="card__text">
      <h3 class="card__text-title">
        <strong>Name:</strong> {{ character.name }}
      </h3>
      <p><strong>Homeworld:</strong> {{ homeWorld.name }}</p>
      <ButtonLike v-on:toggle-like="toggleLike" :state="stateLike" />
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      stateLike: this.character.favorite,
      homeWorld: {},
    };
  },
  props: {
    character: Object,
  },
  mounted() {
    let planet = this.character.homeworld;
    this.fetchPlanetApi(planet);
  },
  updated() {
    this.stateLike = this.character.favorite;
  },
  methods: {
    ...mapMutations([
      "toggleStateFavorite",
      "pushInFavoritesCharacters",
      "deleteInFavoritesCharacters",
    ]),
    toggleLike(state) {
      let like = state;
      let characterName = this.character.name;
      let payload = { characterName, like };
      this.toggleStateFavorite(payload);
      this.stateLike = !this.stateLike;
      if (like) {
        this.pushInFavoritesCharacters(this.character);
      } else {
        this.deleteInFavoritesCharacters(this.character);
      }
    },
    async fetchPlanetApi(planet) {
      const characters = await this.$axios.$get(`${planet}`);
      this.homeWorld = characters;
    },
  },
  computed: {
    fetchImgCharacter() {
      let characterId = this.character.url.split("/")[5];
      return `https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`;
    },
  },
};
</script>

<style scoped>
.card {
  max-width: 320px;
  padding: 5px;
  background-color: rgba(245, 245, 245, 0.877);
  border-radius: 5px;
  text-align: start;
}
.card__img {
  display: block;
  width: 310px;
  height: 420px;
  margin-bottom: 10px;
  object-fit: cover;
  object-position: center;
  background-color: rgba(230, 230, 230, 0.548);
  border-radius: 5px;
}
.card__text {
  position: relative;
  font-size: 16px;
}
.card__text-title {
  line-height: 120%;
}
</style>

