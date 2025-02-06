<template>
  <div
    v-bind:class="
      hover.one == index || hover.two == index || (hover.one == -1 && hover.two == -1)
        ? 'backBox'
        : 'backBoxSmall'
    "
  >
    <p
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

<script>
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
  background-color: rgba(255, 255, 255, 0.7);
  color: #333;
  width: 4em;
  height: 6em;
  border-radius: 1em;
  margin: 1em;
  z-index: 1;
  transition: 0.2s;
  cursor: pointer;
}

.backBox:active {
  background-color: rgba(255, 255, 255, 0.9);
  transition: 0s;
}

.backBoxSmall {
  background-color: rgba(255, 255, 255, 0.5);
  color: #888;
  width: 3.5em;
  height: 5.5em;
  border-radius: 1em;
  margin: 1.25em;
  z-index: 1;
  transition: 0.2s;
  cursor: pointer;
}

.centerLetter {
  font-size: 1.9em;
  width: 100%;
  height: 100%;
  margin: 0px;
  transition: 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.centerLetterSmall {
  font-size: 1.8em;
  width: 100%;
  height: 100%;
  margin: 0px;
  transition: 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
