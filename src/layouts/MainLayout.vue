<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title>
          Star Wars
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      bordered
      class="drawer q-py-md q-px-md"
    >
          Filters

        <q-form
          @submit.prevent=""
          @reset=""
          class="filter-form column q-gutter-md q-my-md"
        >
          <fieldset>
            <legend>Films</legend>
            <q-checkbox
              v-for="(film, idx) in allFilms"
              :key="idx"
              :label="film.title"
            />
          </fieldset>
          <fieldset>
            <legend>Planets</legend>
            <q-checkbox
              v-for="(planet, idx) in allPlanets"
              :key="idx"
              :label="planet.name"
            />
          </fieldset>
          <fieldset>
            <legend>Species</legend>
            <q-checkbox
              v-for="(specie, idx) in allSpecies"
              :key="idx"
              :label="specie.name"
            />
          </fieldset>
          <div>
            <q-btn label="Submit" type="submit" color="primary"/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import {mapGetters} from "vuex";

export default defineComponent({
  name: 'MainLayout',
  components: {},
  computed: mapGetters(['allCharacters', 'allPlanets', 'allFilms', 'allSpecies', 'allVehicles', 'allStarships', 'pageNumber']),
})
</script>

<style lang="scss">
.drawer {
  font-size: 20px;
}
.filter-form {
  font-size: 16px;
}
</style>
