<template>
  <button class="card__text-btn" type="button" v-on:click="toggleLike">
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Iconly/Light/Heart">
        <g id="Heart">
          <path
            :class="{ like: state }"
            id="Stroke 1"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2.87187 11.5983C1.79887 8.24832 3.05287 4.41932 6.56987 3.28632C8.41987 2.68932 10.4619 3.04132 11.9999 4.19832C13.4549 3.07332 15.5719 2.69332 17.4199 3.28632C20.9369 4.41932 22.1989 8.24832 21.1269 11.5983C19.4569 16.9083 11.9999 20.9983 11.9999 20.9983C11.9999 20.9983 4.59787 16.9703 2.87187 11.5983Z"
            stroke="#130F26"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            id="Stroke 3"
            d="M16 6.70001C17.07 7.04601 17.826 8.00101 17.917 9.12201"
            stroke="#130F26"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </g>
    </svg>
  </button>
</template>

<script>
export default {
  props: {
    state: Boolean
  },
  methods: {
    toggleLike () {
      let current = !this.state;
      return this.$emit("toggle-like", current);
    },
  },
};
</script>

<style scoped>
.card__text-btn {
  position: absolute;
  right: 10px;
  bottom: 0;
  height: 24px;
  width: 24px;
  background-color: transparent;
}
.card__text-btn:active {
  animation: like 0.2s ease-in-out forwards;
}

@keyframes like {
  0% {
    transform: scale(1);
  }
  80% {
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}

.like {
  fill: tomato;
}
</style>