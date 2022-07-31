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

          <q-checkbox v-model="films" label="Films" />

          <q-checkbox v-model="planets" label="Planets" />

          <q-checkbox v-model="species" label="Species" />

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

export default defineComponent({
  name: 'MainLayout',
  components: {},
  setup () {
    return {
      films: ref(false),
      planets: ref(false),
      species: ref(false),
    }
  }
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
