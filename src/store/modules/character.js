export default {
  state: {
    characters: [],
    planets: [],
    page: 1,
  },
  getters: {
    allCharacters(state) {
      return state.characters
    },
    allPlanets(state) {
      return state.planets
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
            context.commit('updateCharacters', characters)
          }
          catch (err) {
            console.log('Characters not found ', err)
          }
        })
    },
    async fetchPlanet(context, url) {
      return await fetch(`${url}`)
        .then(res => res.json())
        .then(res => {
          try {
            const planet = {
              "way": `${url}`,
              "name": res.name,
            }
            context.commit('updatePlanets', planet)
          }
          catch (err) {
            console.log('Planets not found ', err)
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
    },
    updatePlanets(state, planet) {
      if (state.planets.length > 0) {
        let coin = 0;
        state.planets.forEach(el => {
          if (el.name === planet.name) {
            coin += 1;
          }
        })
        if (coin < 1) {
          state.planets.push(planet)
        }
      } else {
        state.planets.push(planet)
      }
    }
  }
}
