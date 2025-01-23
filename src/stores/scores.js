import { collection, doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { useFirestore, useCollection } from 'vuefire'
import { defineStore } from 'pinia'

export const useScoresStore = defineStore('scores', () => {
  // Firebase data.
  const db = useFirestore()
  const scores = useCollection(collection(db, 'scores'))

  // Getters.
  const getSortedScores = () => {
    return [...scores.value].sort((a, b) => b.score - a.score)
  }

  // Actions.
  const addScore = async (payload) => {
    return await addDoc(collection(db, 'scores'), {
      ...payload,
    })
  }

  return {
    scores,
    getSortedScores,
    addScore,
  }
})
