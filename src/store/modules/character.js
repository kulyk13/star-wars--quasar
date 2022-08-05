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
            const dataObject = {};
            if (!url.includes('films')) {
              dataObject.way = `${url}`;
              dataObject.name = res.name;
            } else {
              res.results.forEach(el => {
                dataObject.way = el.url;
                dataObject.title = el.title;
              })
            }
            context.commit('updateData', dataObject)
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
      if (data.way.includes('planets')) {
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
      } else if (data.way.includes('films')) {
        if (state.films.length > 0) {
          let coin = 0;
          state.films.forEach(el => {
            if (el.title === data.title) {
              coin += 1;
            }
          })
          if (coin < 1) {
            state.films.push(data)
          }
        } else {
          state.films.push(data)
        }
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
