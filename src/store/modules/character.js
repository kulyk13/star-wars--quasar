export default {
  state: {
    characters: [],
    page: 1,
  },
  getters: {
    allCharacters(state) {
      return state.characters
    },
    pageNumber(state) {
      return state.page
    }
  },
  actions: {
    async fetchCharacters(context, page = 1) {
      return await fetch(`https://swapi.dev/api/people/?page=` + page)
        .then(res => res.json())
        .then(res => {
          try {
            const characters = res.results
            console.log(characters)
            context.commit('updateCharacters', characters)
          }
          catch (err) {
            console.log('Characters not found ', err)
          }
        })
    }
  },
  mutations: {
    updateCharacters(state, characters) {
      characters.forEach(el => {
        state.characters.push(el)
      })
      state.page++
    }
  }
}
