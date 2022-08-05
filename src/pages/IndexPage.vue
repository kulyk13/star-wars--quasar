<template>
  <q-page class="flex column items-center q-px-md q-py-md">
    <div class="card-list flex items-start justify-evenly">
      <q-card
        v-for="character in allCharacters"
        :key="character.name"
        class="my-card"
      >
        <img
          v-if="character.gender === 'male'"
          src="https://img.freepik.com/free-icon/important-person_318-10744.jpg?w=740&t=st=1659130070~exp=1659130670~hmac=4c4490d7b0efb9988d899c5f6406d3cc2483a95e08e1e748ec3a5f957e735b35"
          class="my-card__img"
          width="1"
          height="1"
          loading="lazy"
        >
        <img
          v-if="character.gender === 'female'"
          src="https://t3.ftcdn.net/jpg/01/87/68/52/360_F_187685268_rBij3TI5BrcE1zRiyfWLJZEhXMRHEaRv.jpg"
          class="my-card__img"
          width="1"
          height="1"
          loading="lazy"
        >
        <img
          v-if="character.gender === 'n/a'"
          src="https://www.creativefabrica.com/wp-content/uploads/2018/12/Robot-icon-by-rudezstudio-4-580x386.jpg"
          class="my-card__img"
          width="1"
          height="1"
          loading="lazy"
        >

        <q-card-section>
          <div class="text-h6">{{ character.name }}</div>
          <div class="text-subtitle2">{{ character.gender !== 'n/a' ? character.gender : 'robot'}}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text">Planet: {{ planet(character.homeworld) }}</div>
          <div class="text">
            Films:
            <ul class="films-list">
              <li
                v-for="film in character.films"
                class="films-list__item"
              >
                {{ films(film) }}
              </li>
            </ul>
          </div>
          <div class="text">Species: {{ character.species.length > 0 ? character.species : 'none' }}</div>
          <div class="text">Vehicles: {{ character.vehicles.length > 0 ? character.vehicles : 'none' }}</div>
          <div class="text">Starships: {{ character.starships.length > 0 ? character.starships : 'none' }}</div>
        </q-card-section>
      </q-card>
    </div>
    <q-btn
      @click="addMore(pageNumber)"
      class="q-my-md"
    >
      Add more
    </q-btn>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters, mapActions } from 'vuex'

export default defineComponent({
  name: 'IndexPage',
  data() {
    return {}
  },
  methods: {
    ...mapActions(['fetchCharacters', 'fetchData']),
    addMore(page) {
      this.fetchCharacters(page)
    },
    planet(url) {
      this.fetchData(url)
      for (let i = 0; i < this.allPlanets.length; i++) {
        if (this.allPlanets[i].way === url) {
          return this.allPlanets[i].name
        }
      }
    },
    films() {
      for (let i = 0; i < this.allFilms.length; i++) {
        if (this.allFilms[i].url === url) {
          return this.allFilms[i].title
        }
      }
    },

  },
  computed: mapGetters(['allCharacters', 'allPlanets', 'allFilms', 'allSpecies', 'allVehicles', 'allStarships', 'pageNumber']),
  mounted() {
    this.fetchCharacters();
    this.fetchData('https://swapi.dev/api/films/');
  }
})
</script>

<style lang="scss">
.my-card {
  width: 35%;
  gap: 15px 15px;

  &__img {
    width: 415px;
    height: 415px;
    object-fit: cover;
  }
}
.card-list {
  gap: 20px 20px;
}
</style>
