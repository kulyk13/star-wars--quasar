import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import character from './modules/character'

export default store(function (/* { ssrContext } */) {
  const Store = createStore({

    modules: {
      character
    },

    strict: process.env.DEBUGGING
  })

  return Store
})
