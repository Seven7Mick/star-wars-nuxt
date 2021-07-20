import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = () => new Vuex.Store({
  state: {
    allCharacters: [],
    favoritesCharacters: [],

    pagination: {},
    currentPage: 1
  },
  actions: {
    async fetchAllCharacters (ctx, url = 'https://swapi.dev/api/people') {
      const data = await this.$axios.$get(url)

      const pagination = {
        next: data.next,
        previous: data.previous,
        count: data.count
      }
      ctx.commit('updateAllCharacters', data.results)
      ctx.commit('updatePagination', pagination)
    }
  },
  mutations: {
    updateAllCharacters (state, payload) {
      state.allCharacters = payload
      for (const character of state.allCharacters) {
        character.favorite = false
      }
    },
    toggleStateFavorite (state, payload) {
      const { characterName, like } = payload

      if (state.allCharacters.find(character => character.name === characterName)) {
        state.allCharacters.find(character => character.name === characterName).favorite = like
      }
      if (state.favoritesCharacters.find(character => character.name === characterName)) {
        state.favoritesCharacters.find(character => character.name === characterName).favorite = like
      }
    },
    updatePagination (state, payload) {
      state.pagination = payload
    },
    pushInFavoritesCharacters (state, payload) {
      state.favoritesCharacters.push(payload)
    },
    deleteInFavoritesCharacters (state, payload) {
      state.favoritesCharacters = state.favoritesCharacters.filter(el => el.name !== payload.name)
    }
  },
  getters: {
    getAllCharacters (state) {
      if (state.favoritesCharacters.length) {
        for (const character of state.allCharacters) {
          if (state.favoritesCharacters.find(el => el.name === character.name)) {
            character.favorite = state.favoritesCharacters.find(el => el.name === character.name).favorite
          }
        }
      }
      return state.allCharacters
    },
    getFavoritesCharacters (state) {
      return state.favoritesCharacters
    },
    getPagination (state) {
      return state.pagination
    }
  }
})

export default store
