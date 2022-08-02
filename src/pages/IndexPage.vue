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
          <div class="text">Planet: {{ character.homeworld}}</div>
          <div class="text">Films: {{ character.films }}</div>
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
    return {
      // mainUrl: 'https://swapi.dev/api/',
      // peopleUrl: 'people/',
      // planetsUrl: 'planets/',
      // filmsUrl: 'films/',
      // speciesUrl: 'species/',
      // vehiclesUrl: 'vehicles/',
      // starshipsUrl: 'starships/',
    }
  },
  methods: {
    ...mapActions(['fetchCharacters']),
    addMore(page) {
      // if () {
        this.fetchCharacters(page)
      // }
    }
  },
  computed: mapGetters(['allCharacters', 'pageNumber']),
  mounted() {
    this.fetchCharacters();
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
