export default {
  state: {
    characters: []
  },
  getters: {
    allCharacters(state) {
      return state.characters
    }
  },
  actions: {
    async fetchCharacters(context) {
      return await fetch(`https://swapi.dev/api/people/?page=1`)
        .then(res => res.json())
        .then(res => {
          console.log(res.results)
          context.commit('updateCharacters', res.results)
        })
    }
  },
  mutations: {
    updateCharacters(state, characters) {
      state.characters = characters
    }
  }
}
