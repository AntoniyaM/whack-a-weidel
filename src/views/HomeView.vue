<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useScoresStore } from '@/stores/scores'
import { isMobile } from '@/utils/isMobile'

// Data.
const rows = ref(5)
const cols = ref(3)
const score = ref(0)
const time = ref(30)
const playing = ref(false)
const enterScore = ref(false)
const playerName = ref('')
const currentDuration = ref(0)
const currentHole = ref(null)
const whackedHole = ref(null)
const router = useRouter()

// Methods.
const { addScore } = useScoresStore()
const saveScore = async () => {
  if (!playerName.value) {
    return
  }

  await addScore({
    name: playerName.value,
    points: score.value,
  })
  enterScore.value = false
  await router.push('/scoreboard')
}
const stopGame = (interval) => {
  clearInterval(interval)
  playing.value = false
  enterScore.value = true
}

const startGame = () => {
  playing.value = true
  time.value = 30
  score.value = 0
  const interval = setInterval(() => {
    time.value--

    if (time.value <= 0) {
      stopGame(interval)
    } else {
      if (!currentHole.value && !whackedHole.value) {
        showAndHideWeidel()
      }
    }
  }, 1000)
}

const getRandomHole = (min = 1, max = rows.value * cols.value) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const getRandomDuration = (min = 700, max = 1200) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const showAndHideWeidel = () => {
  currentHole.value = getRandomHole()
  currentDuration.value = getRandomDuration()

  setTimeout(() => {
    currentHole.value = null
  }, currentDuration.value)
}

const whack = (i) => {
  score.value = score.value + 10
  whackedHole.value = i

  setTimeout(() => {
    whackedHole.value = null
  }, 250)
}

// Mounted.
onMounted(() => {
  // Reduce rows & add some more cols on larger screens.
  if (!isMobile()) {
    rows.value = 4
    cols.value = 4
  }
})
</script>

<template>
  <div class="container">
    <div class="text-center">
      <h1>Whack-A-Weidel</h1>
      <p>Wie oft kannst Du Frau Weidel in 30 Sekunden erwischen? 🥊</p>
      <strong>🌟 Punkte: {{ score }} | 🕰️ Zeit: {{ time }}</strong>
      <p>
        <RouterLink to="/scoreboard" class="button button--outline">📋 Score Board</RouterLink>
      </p>
    </div>

    <Transition name="slide-down" appear>
      <div v-if="!playing" class="overlay">
        <div v-if="enterScore" class="text-center">
          <strong>Die Zeit ist um!</strong>
          <p v-if="score > 100">
            Wow! Du hast {{ score }} Punkte erspielt!
          </p>
          <p v-else>
            {{ score }} Punkte. Das kannst Du besser!
          </p>
          <input v-model="playerName" type="text" placeholder="Enter your name" maxlength="25" />
          <div @click="saveScore" class="button">
            Submit
          </div>
        </div>
        <div v-else @click="startGame" class="button">
          Start
        </div>
      </div>
    </Transition>

    <div class="game">
      <div v-for="i in rows * cols" :key="`hole-${i}`" class="hole">
        <div class="dirt">
          <Transition name="slide-up">
            <div v-if="currentHole === i || whackedHole === i" @click="whack(i)" class="white-supremacist-bitch">
              <img v-if="whackedHole === i" src="/stars-over-head.webp" alt="">
              <img src="/weidel.webp" alt="Frau Weidels Kopf">
            </div>
          </Transition>
          <img src="/dirt.webp" alt="Dreck">
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/mixins/bp';

.overlay {
  width: 80vw;
  height: 300px;
  max-width: 600px;
  backdrop-filter: blur(4px);
  position: fixed;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid $color-white;
  border-radius: $border-radius;
  box-shadow: 0 0 12px rgba($color-black, 0.15);
  z-index: 2;

  p,
  strong {
    text-shadow: 1px 1px $color-grey;
  }
}

.game {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(120px, auto);
  gap: 1rem;
  margin-block: 2rem;

  @include bp(m) {
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: minmax(200px, auto);
  }
}

.hole {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
}

.white-supremacist-bitch {
  max-width: 130px;
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translateX(-50%);

  // Decorative image.
  img[alt=""] {
    width: 110%;
    position: absolute;
    top: -20%;
    left: -20%;
    z-index: 1;
  }
}

.dirt {
  max-width: 105px;
  position: relative;

  @include bp(m) {
    max-width: 180px;
  }

  img {
    width: 100%;
    position: relative;
  }
}
</style>
