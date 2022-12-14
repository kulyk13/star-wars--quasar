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
      return await fetch(url)
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
      } else if (data.way && data.way.includes('species')) {
        if (state.species.length > 0) {
          let coin = 0;
          state.species.forEach(el => {
            if (el.name === data.name) {
              coin += 1;
            }
          })
          if (coin < 1) {
            state.species.push(data)
          }
        } else {
          state.species.push(data)
        }
      } else if (data[0] && data[0].url.includes('films')) {
          // console.log(data[i].title)
          // for (let i = 0; i < data.length; i++) {
          //   if (state.films[i].title !== data[i].title) {
          //     state.films.push(data[i].title)
          //   }
          // }
          data.forEach(el => {
            state.films.push(el)
            console.log(el)
          })
      } else if (data.way && data.way.includes('vehicles')) {
          if (state.vehicles.length > 0) {
            let coin = 0;
            state.vehicles.forEach(el => {
              if (el.name === data.name) {
                coin += 1;
              }
            })
            if (coin < 1) {
              state.vehicles.push(data)
            }
          } else {
            state.vehicles.push(data)
          }
      } else if (data.way && data.way.includes('starships')) {
          if (state.starships.length > 0) {
            let coin = 0;
            state.starships.forEach(el => {
              if (el.name === data.name) {
                coin += 1;
              }
            })
            if (coin < 1) {
              state.starships.push(data)
            }
          } else {
            state.starships.push(data)
          }
      }
    }
  }
}
