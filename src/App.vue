<template>
  <div>
    <h1>
      Metronome:
      <input class="textInput" type="number" min="10" max="300" v-model="metronome.bpm" />BPM
    </h1>
    <div class="arrowHolder noselect">
      <div class="arrowInnerBox">
        <i @click="playPause()" style="cursor: pointer">{{ getPlayPauseIcon }}</i>
      </div>
    </div>
    <b style="font-size: 26px; margin: 10px">{{ numHitsVar }}</b>
    <div class="slideContainer">
      <input
        type="range"
        min="3"
        v-bind:max="maxHits"
        v-model="numHitsVar"
        class="slider"
        id="numHits"
      />
    </div>
    <div class="generalBox">
      <div class="hitsBox animateIn">
        <DrumHit
          class="noselect"
          v-for="(n, i) in patternArray"
          :hitType="patternArray[i]"
          v-show="i < numHitsVar"
          :key="'item' + i + keyUpdate"
          :hover="highlighted"
          :index="i"
          @mouseover="highlighted.one = i"
          @mouseleave="highlighted.one = -1"
        ></DrumHit>
      </div>
      <div @click="genPattern()" id="genButton" class="noselect">Generate</div>
    </div>
  </div>
</template>

<script lang="js">
import DrumHit from './components/DrumHit.vue'
import { Howl } from 'howler'
export default {
  name: 'app',
  components: { DrumHit },
  data() {
    return {
      numHitsVar: 5,
      possArray: ['L', 'R', 'K'],
      patternArray: [],
      highlighted: {
        one: -1,
        two: -1,
      },
      keyUpdate: 0,
      metronome: {
        bpm: 120,
        interval: null,
        index: 0,
      },
      isPlaying: false,
      maxHits: 15,
      audioFiles: {
        L: new Howl({ src: 'src/assets/SnareHit.mp3' }),
        R: new Howl({ src: 'src/assets/HiHat.mp3', volume: 0.7 }),
        K: new Howl({ src: 'src/assets/Kick.mp3', volume: 0.8 }),
      },
    }
  },
  methods: {
    /*
     * Generates the sticking pattern and places it into an array. Makes sure there are no triplets of the same hit.
     */
    genPattern: function () {
      this.patternArray = []
      while (this.patternArray.length < this.maxHits) {
        let letter = this.possArray[Math.floor(Math.random() * this.possArray.length)]
        const patLength = this.patternArray.length

        //Checks if the previous two items in the array match the one that is about to be added and changes it if it is
        if (patLength > 1) {
          if (
            this.patternArray[patLength - 2].localeCompare(letter) == 0 &&
            this.patternArray[patLength - 1].localeCompare(letter) == 0
          ) {
            const dupArray = this.possArray.slice()
            dupArray.splice(dupArray.indexOf(letter), 1)
            letter = dupArray[Math.floor(Math.random() * dupArray.length)]
          }
        }
        this.patternArray.push(letter)
      }
    },
    changeLetter: function (i) {
      //var audio = new Audio("./src/audio/mid.mp3");
      //audio.play();
      this.patternArray[i] =
        this.possArray[(this.possArray.indexOf(this.patternArray[i]) + 1) % this.possArray.length]
      this.keyUpdate++
    },
    playPause: function () {
      if (this.isPlaying) {
        this.isPlaying = false
      } else {
        this.isPlaying = true
      }
    },
    playSound() {
      let nextSound = this.highlighted.two + 1
      if (this.highlighted.two < this.numHitsVar - 1) {
        this.highlighted.two++
      } else {
        nextSound = 0
        this.highlighted.two = 0
      }
      if (this.patternArray[nextSound].localeCompare('L') == 0) {
        this.audioFiles.L.play()
      } else if (this.patternArray[nextSound].localeCompare('R') == 0) {
        this.audioFiles.R.play()
      } else if (this.patternArray[nextSound].localeCompare('K') == 0) {
        this.audioFiles.K.play()
      }
    },
  },
  computed: {
    getPlayPauseIcon: function () {
      if (this.isPlaying) {
        clearInterval(this.metronome.interval)
        this.metronome.interval = setInterval(
          () => {
            this.playSound()
          },
          (60 * 1000) / this.metronome.bpm,
        )
        return 'pause'
      } else {
        this.highlighted.two = -1
        clearInterval(this.metronome.interval)
        return 'play_arrow'
      }
    },
  },
  beforeMount() {
    this.genPattern()
  },
}
</script>

<style>
@font-face {
  font-family: 'Material_Icons';
  src: url('/src/fonts/Material_Icons.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}

.arrowHolder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  font-size: 50px;
}

.arrowInnerBox {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  transition: var(--transition-time);
  color: var(--blue_general);
}

.arrowInnerBox:hover {
  border: 4px solid var(--blue_general);
}

.arrowInnerBox:active {
  transition: 0s;
  border: 4px solid var(--blue_general);
  background-color: var(--blue_general);
  color: white;
}

i {
  font-family: 'Material_Icons';
  font-style: normal;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin: 0px;
  padding: 0px;
  transition: var(--transition-time);
}

#genButton {
  background-color: rgba(255, 255, 255, 0.7);
  width: 10rem;
  height: var(--button-height);
  cursor: pointer;
  border-radius: 2rem;
  font-size: 1.5rem;
  line-height: var(--button-height);
  transition: 0.2s;
}

#genButton:active {
  background-color: rgba(255, 255, 255, 0.85);
  transition: 0.05s;
  width: 9.5rem;
  height: 2.75rem;
  line-height: 2.75rem;
  margin: 0.125rem 0;
}

.hitsBox,
.generalBox {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.animateIn {
  animation-timing-function: cubic-bezier(0.53, 0.26, 0.29, 1.31);
  animation-name: animate-pop;
  animation-duration: 1s;
}

.hitsBox {
  flex-direction: row;
}

.generalBox {
  flex-direction: column;
  color: #222;
  gap: 1rem;
}

.noselect {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.slidecontainer {
  width: 100%;
  max-width: 500px;
}

/* The slider itself */
.slider {
  z-index: 2;
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  max-width: 500px;
  height: 4px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.8;
  -webkit-transition: var(--transition-time);
  transition: opacity var(--transition-time);
  margin: 10px 0 20px 0;
}

#genButton:hover {
  transition: 0.2s;
  background-color: rgba(255, 255, 255, 0.8);
}

.slider::-webkit-slider-thumb {
  z-index: 2;
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: var(--slider-color);
  cursor: pointer;
  border-radius: 50%;
}

.slider::-moz-range-thumb {
  z-index: 2;
  width: 20px;
  height: 20px;
  background: var(--slider-color);
  cursor: pointer;
  border-radius: 50%;
}

.textInput {
  background-color: white;
  border: 0px solid black;
  font-size: 26px;
  font-weight: bold;
  width: 70px;
  transition: var(--transition-time);
  background-color: rgba(0, 0, 0, 0);
  color: white;
}

h1 {
  font-size: 20px;
  font-weight: normal;
}

.slideAndLabel {
  display: flex;
  flex-direction: row;
  align-items: center;
}

@keyframes animate-pop {
  0% {
    opacity: 0;
    transform: scale(0.95, 0.95);
    transform: translate(0, 20px);
  }
  100% {
    opacity: 1;
    transform: scale(1, 1);
    transform: translate(0, 0);
  }
}
</style>
