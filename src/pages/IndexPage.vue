<template>
  <q-page class="flex column items-center q-px-md q-py-md">
    <div class="card-list flex items-start justify-evenly">
      <q-card
        v-for="(card, idx) in cardData"
        :key="card.name"
        class="my-card"
      >
        <img src="https://img.freepik.com/free-icon/important-person_318-10744.jpg?w=740&t=st=1659130070~exp=1659130670~hmac=4c4490d7b0efb9988d899c5f6406d3cc2483a95e08e1e748ec3a5f957e735b35">

        <q-card-section>
          <div class="text-h6">{{ card.name }}</div>
          <div class="text-subtitle2">{{ card.gender !== 'n/a' ? card.gender : 'robot'}}</div>
          <div class="text">Planet: {{ card.homeworld}}</div>
          <div class="text">Films: {{ card.films }}</div>
          <div class="text">Species: {{ card.species === [] ? '' : card.species }}</div>
          <div class="text">Vehicles: {{ card.vehicles === [] ? '' : card.vehicles }}</div>
          <div class="text">Starships: {{ card.starships === [] ? '' : card.starships }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">

        </q-card-section>
      </q-card>
    </div>
    <q-btn
      @click="getPeople(page, this.mainUrl)"
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
      mainUrl: 'https://swapi.dev/api/',
      peopleUrl: 'people/',
      planetsUrl: 'planets/',
      filmsUrl: 'films/',
      speciesUrl: 'species/',
      vehiclesUrl: 'vehicles/',
      starshipsUrl: 'starships/',
      page: 1,
      cardData: [],
    }
  },
  methods:{
    async getPeople(page, url) {
      return await fetch(`${url}${this.peopleUrl}?page=${page}`)
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
      // return await fetch(`https://swapi.dev/api/people/?page=${page}`)
      //   .then(res => res.json())
      //   .then(res => {
      //     try {
      //       if (this.page <= Math.ceil(res.count / 10)) {
      //         res.results.forEach(el => {
      //           this.cardData.push(el)
      //         })
      //         this.page++
      //       }
      //     }
      //     catch (err) {
      //       console.log('People not found', err)
      //     }
      //   })
    },
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
