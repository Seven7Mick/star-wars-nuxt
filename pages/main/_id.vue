<template>
  <div class="main">
    <Loader v-if="loader" />
    <div v-else class="main__wrapper">
      <div class="main__form">
        <input
          type="text"
          v-model="search"
          placeholder="Поиск по имени"
          class="main__search"
          @change="searchCharacters()"
        />

        <select class="main__select" v-model="select">
          <option value="all">all</option>
          <option value="male">male</option>
          <option value="female">female</option>
          <option value="hermaphrodite">hermaphrodite</option>
          <option value="n/a">n/a</option>
          <option value="none">none</option>
        </select>
      </div>
      <p
        class="main__select-non"
        v-if="!filteredList.length && select !== 'all'"
      >
        NOT FOUND
      </p>
      <div class="main__content">
        <Card
          v-for="character of currentList"
          :key="character.id"
          :character="character"
          class="main__card"
        />
      </div>

      <Pagination
        @increment="increment"
        @decrement="decrement"
        @currentPage="currentPage"
        :total="totalCount"
        :pages="getPage"
        :page="page"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      search: "",
      select: "all",
      allCharacters: [],
      loader: true,

      page: 1,
      perPage: 10,
      totalItems: 0,
      totalPage: 0,
      totalCount: 0,
    };
  },
  beforeMount() {
    this.page = +this.$route.params.id
  },
  mounted() {
    this.fetchAllCharacters(`https://swapi.dev/api/people/?page=${this.page}`);
    this.allCharacters = this.getAllCharacters;
    this.totalItems = this.getAllCharacters.length;
    this.totalCount = this.getPagination.count;
    this.totalPage = Math.ceil(this.getPagination.count / this.perPage);
    if (this.getAllCharacters.length !== 0) {
      this.loader = false;
    }
  },
  updated() {
    this.allCharacters = this.getAllCharacters;
  },
  computed: {
    ...mapGetters(["getAllCharacters", "getPagination"]),
    getPage() {
      const pageArray = [];
      for (let i = 1; i <= this.totalPage; i += 1) {
        pageArray.push(i);
      }
      return pageArray;
    },
    filteredList() {
      return this.allCharacters.filter((el) => el.gender === this.select);
    },
    currentList() {
      return this.select !== "all" ? this.filteredList : this.allCharacters;
    },
  },
  methods: {
    ...mapActions(["fetchAllCharacters"]),
    increment() {
      if (this.totalItems === this.perPage) {
        this.page += 1;
        this.$store.state.currentPage += 1;
        this.$router.push(`/main/${this.page}`);
      }
    },
    decrement() {
      if (this.page > 1) {
        this.page -= 1;
        this.$store.state.currentPage -= 1;
        this.$router.push(`/main/${this.page}`);
      }
    },
    currentPage(page) {
      this.page = page;
      this.$store.state.currentPage = page;
      let url = `https://swapi.dev/api/people/`;
      if (this.search && page) {
        url = `https://swapi.dev/api/people/?search=${this.search}&page=${this.page}`;
        return this.fetchAllCharacters(url);
      }
      if (page) {
        url = `https://swapi.dev/api/people/?page=${page}`;
        return this.$router.push(`/main/${this.page}`);
      }
    },
    searchCharacters() {
      if (this.search === "") {
        this.$store.state.currentPage = this.page = 1;
        this.$router.push(`/main/${this.page}`)
      }
      let url = `https://swapi.dev/api/people/?search=${this.search}`;
      this.page = 1;
      this.fetchAllCharacters(url);
    },
  },
  watch: {
    getAllCharacters: function (newVal) {
      this.loader = false;
      this.allCharacters = newVal;
      this.totalItems = newVal.length;
    },
    getPagination: function (newVal) {
      this.totalPage = Math.ceil(newVal.count / this.perPage);
      this.totalCount = newVal.count;
    },
  },
};
</script>


<style>
.main__content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
}
.main__card {
  margin: 0 5px 15px 5px;
}
.main__form {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
.main__search {
  width: 70%;
  padding: 10px 15px;
  margin-bottom: 20px;
  margin-right: 10px;
  color: black;
  font-size: 28px;
  border: none;
  border-radius: 5px;
  outline: none;
}
.main__select {
  width: 150px;
  padding: 5px 10px;
  font-size: 16px;
  line-height: 120%;
  border-radius: 5px;
}
.main__select-non {
  font-size: 20px;
  line-height: 150%;
  color: black;
}
</style>
