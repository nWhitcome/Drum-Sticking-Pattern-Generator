<template>
  <div class="backBox">
    <p
      @click="$parent.changeLetter(index)"
      v-bind:class="
        hover.one == index || hover.two == index || (hover.one == -1 && hover.two == -1)
          ? 'centerLetter'
          : 'centerLetterSmall'
      "
    >
      {{ hitType }}
    </p>
  </div>
</template>

<script lang="js">
export default {
  name: 'DrumHit',
  props: ['hitType', 'active', 'hover', 'index'],
  data() {
    return {
      hitLetter: this.hitType,
    }
  },
  watch: {
    data(val) {
      this.hitLetter = val
    },
  },
}
</script>

<style lang="scss">
.backBox {
  width: 6rem;
  height: 8rem;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.centerLetter:active {
  background-color: rgba(255, 255, 255, 0.75);
  width: 3.8rem;
  height: 5.8rem;
  transition: 0.05s;
}

.centerLetter {
  color: #222;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.7);
  font-size: 2rem;
  border-radius: 1rem;
  width: 4rem;
  height: 6rem;
  transition: 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.centerLetterSmall {
  background-color: rgba(255, 255, 255, 0.5);
  font-size: 1.75rem;
  width: 100%;
  height: 100%;
  width: 3.5rem;
  height: 5.5rem;
  border-radius: 1rem;
  transition: 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.popin-enter-from {
  opacity: 1;
}

.popin-enter-active {
  transition: opacity 0.5s ease;
}
</style>
