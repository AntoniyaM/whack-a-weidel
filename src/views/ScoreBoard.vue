<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useScoresStore } from '@/stores/scores'

// Data.
const { scores } = storeToRefs(useScoresStore())

// Computed.
const topScores = computed(() => {
  return scores.value
    .sort((a, b) => b.points - a.points)
    .slice(0, 20)
})
</script>

<template>
  <div class="container">
    <div class="text-center">
      <h1>Score Board</h1>
      <p>
        <strong>Die Top 20 Spieler.</strong>
      </p>
      <p>
        <RouterLink to="/" class="button button--outline">Zurück</RouterLink>
      </p>
    </div>

    <TransitionGroup name="slide-right" tag="div" class="card" appear>
      <div v-for="(score, i) in topScores"
           :key="score"
           :style="{ transitionDelay: `${i * 100}ms` }"
           class="score">
        {{ i + 1 }}. {{ score.name }}
        <span>
          {{ i === 0 ? '👑' : i === 1 ? '🏅' : i === 2 ? '🌟' : '' }}
          {{ score.points }}
        </span>
      </div>
      <small class="text-center">I made you mad? Great, I don't give a f*ck. 🖕</small>
    </TransitionGroup>
  </div>
</template>

<style lang="scss">
.card {
  max-width: 760px;
  margin-block: 2.25rem;
  margin-inline: auto;
  display: grid;
  gap: 1.25rem;
}

.score {
  font-size: 1.5rem;
  padding: 0 0.5rem 0.5rem;
  border-bottom: 1px solid $color-grey;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-weight: 900;
  }
}
</style>
