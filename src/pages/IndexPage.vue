<template>
  <q-page class="flex column items-center q-px-md q-py-md">
    <div class="card-list flex items-start justify-evenly">
      <q-card
        v-for="card in cardData"
        :key="card.name"
        class="my-card"
      >
        <img src="https://cdn.quasar.dev/img/mountains.jpg">

        <q-card-section>
          <div class="text-h6">{{ card.name }}</div>
          <div class="text-subtitle2">{{  }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">

        </q-card-section>
      </q-card>
    </div>
    <q-btn
      @click="getPeople(page)"
      class="q-my-md"
    >
      Add more
    </q-btn>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  data() {
    return {
      page: 1,
      cardData: [],
    }
  },
  methods:{
    async getPeople(page) {
      return await fetch(`https://swapi.dev/api/people/?page=${page}`)
        .then(res => res.json())
        .then(res => {
          try {
            if (this.page <= Math.ceil(res.count / 10)) {
              res.results.forEach(el => {
                this.cardData.push(el)
              })
              this.page++
            }
          }
          catch (err) {
            console.log('People not found', err)
          }
        })
    }
  },
  beforeMount() {
    if (this.cardData.length === 0) {
      fetch(`https://swapi.dev/api/people/?page=${this.page}`)
        .then(res => res.json())
        .then(res => {
            res.results.forEach(el => {
              this.cardData.push(el)
            })
        })
    }
  }
})
</script>

<style lang="scss">
.my-card {
  width: 35%;
  gap: 15px 15px;
}
.card-list {
  gap: 20px 20px;
}
</style>
