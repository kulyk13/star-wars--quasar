export default {
  state: {
    characters: [],
    planets: [],
    films: [],
    species: [],
    vehicles: [],
    starships: [],
    page: 1,
  },
  getters: {
    allCharacters(state) {
      return state.characters
    },
    allPlanets(state) {
      return state.planets
    },
    allFilms(state) {
      return state.films
    },
    allSpecies(state) {
      return state.species
    },
    allVehicles(state) {
      return state.vehicles
    },
    allStarships(state) {
      return state.starships
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
    async fetchData(context, url) {
      return await fetch(`${url}`)
        .then(res => res.json())
        .then(res => {
          try {
            let data = {};
            if (!url.includes('films')) {
              data.way = `${url}`;
              data.name = res.name;
            } else {
              data = res.results
            }
            context.commit('updateData', data)
          }
          catch (err) {
            console.log('Data not found ', err)
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
    updateData(state, data) {
      if (data.way && data.way.includes('planets')) {
        if (state.planets.length > 0) {
          let coin = 0;
          state.planets.forEach(el => {
            if (el.name === data.name) {
              coin += 1;
            }
          })
          if (coin < 1) {
            state.planets.push(data)
          }
        } else {
          state.planets.push(data)
        }
      } else if (data[0].url.includes('films')) {
        data.forEach(el => {
          state.films.push(el)
        })
      } else if (data.way.includes('species')) {
        state.species.push(data)
      } else if (data.way.includes('vehicles')) {
        state.vehicles.push(data)
      } else if (data.way.includes('starships')) {
        state.starships.push(data)
      }
    }
  }
}
