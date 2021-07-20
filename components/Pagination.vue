<template>
  <div class="pagination">
    <span></span>
    <ul class="pagination__list">
      <li
        class="pagination__item pagination__button"
        v-on:click="$emit('decrement')"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M14 5L9 10L14 15L13 17L6 10L13 3L14 5Z" fill="#3D3D3D" />
        </svg>
      </li>
      <li
        :class="[
          page === item ? 'pagination__item_active' : '',
          'pagination__item',
        ]"
        v-on:click="$emit('currentPage', item)"
        v-for="item in pages"
        :key="item"
      >
        {{ item }}
      </li>
      <li
        class="pagination__item pagination__button"
        v-on:click="$emit('increment')"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 15L11 10L6 5L7 3L14 10L7 17L6 15Z" fill="#3D3D3D" />
        </svg>
      </li>
    </ul>
    <p class="pagination__total">Всего {{ total }}</p>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    pages: Array,
    page: Number,
    total: Number,
  },
};
</script>

<style scoped>
.pagination {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 30px;
  padding-bottom: 30px;
  display: flex;
  justify-content: space-between;
}

.pagination__list {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.pagination__item {
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 42px;
  height: 42px;
  margin-right: 18px;

  background-color: #fff;
  border-radius: 6px;
  filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.161));
}

.pagination__item_active {
  font-size: 16px;
  color: #1207b6bb;
}

.pagination__item:last-child {
  margin-right: 0;
}

.pagination__total {
  font-size: 20px;
  font-weight: 500;
  line-height: 42px;
  padding: 0;
  margin: 0;
  color: black;
}
</style>