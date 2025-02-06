<template>
  <label class="switch">
    <input type="checkbox" :value="active" v-model="active" />
    <span class="sliderButton round"></span>
  </label>
</template>

<script>
export default {
  name: 'SliderSwitch',
  data() {
    return {
      active: false,
    }
  },
  watch: {
    active: function (value) {
      this.$emit('activate', value)
    },
  },
}
</script>

<style lang="scss">
.switch {
  margin: 0 10px;
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.sliderButton {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.sliderButton:before {
  position: absolute;
  content: '';
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .sliderButton {
  background-color: #2471a3;
}

input:focus + .sliderButton {
  box-shadow: 0 0 1px #2471a3;
}

input:checked + .sliderButton:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.sliderButton.round {
  border-radius: 34px;
}

.sliderButton.round:before {
  border-radius: 50%;
}
</style>
