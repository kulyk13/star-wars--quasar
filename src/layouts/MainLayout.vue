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
    >
      <q-list class="q-px-md">
        <q-item-label
          header
        >
          Filters
        </q-item-label>

        <q-item-label>
          <q-checkbox left-label v-model="films" label="Films" />
        </q-item-label>
        <q-item-label>
          <q-checkbox left-label v-model="planets" label="Planets" />
        </q-item-label>
        <q-item-label>
          <q-checkbox left-label v-model="species" label="Species" />
        </q-item-label>

      </q-list>
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
