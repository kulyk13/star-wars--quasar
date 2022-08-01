<template>
  <q-page class="flex column items-center q-px-md q-py-md">
    <div class="card-list flex items-start justify-evenly">
      <q-card
        v-for="character in allCharacters"
        :key="character.name"
        class="my-card"
      >
        <img src="https://img.freepik.com/free-icon/important-person_318-10744.jpg?w=740&t=st=1659130070~exp=1659130670~hmac=4c4490d7b0efb9988d899c5f6406d3cc2483a95e08e1e748ec3a5f957e735b35">

        <q-card-section>
          <div class="text-h6">{{ character.name }}</div>
          <div class="text-subtitle2">{{ card.gender !== 'n/a' ? card.gender : 'robot'}}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text">Planet: {{ character.homeworld}}</div>
          <div class="text">Films: {{ character.films }}</div>
          <div class="text">Species: {{ character.species.length > 0 ? character.species : 'none' }}</div>
          <div class="text">Vehicles: {{ character.vehicles.length > 0 ? character.vehicles : 'none' }}</div>
          <div class="text">Starships: {{ character.starships.length > 0 ? character.starships : 'none' }}</div>
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
import { mapGetters } from 'vuex'

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
      fakePage: 1,
      planets: [],
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
                  console.log(this.planets)
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
  computed: mapGetters(['allCharacters']),
  mounted() {
    this.$store.dispatch('fetchCharacters')
    // for (let i = 0; i < 7; i++) {
    //   fetch(`https://swapi.dev/api/planets/?page=${this.fakePage}`)
    //     .then(res => res.json())
    //     .then(res => {
    //       res.results.forEach(el => {
    //         this.planets.push(el)
    //       })
    //       this.fakePage++
    //     })
    // }
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
