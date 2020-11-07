import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // default cards data
    // TODO generate with axis calculation
    cardsDefault: [
      {
        id: 0,
        active: true,
        x: -10,
        y: 10,
        height: -100,
        width: 0,
        z: 1,
        title: 'Card 1'
      },
      {
        id: 1,
        active: true,
        x: -320,
        y: 10,
        height: 100,
        width: 300,
        z: 1,
        title: 'Card 2'
      },
      {
        id: 2,
        active: true,
        x: 6300,
        y: 1000,
        height: 100,
        width: 300,
        z: 1,
        title: 'Card 3'
      },
      {
        id: 3,
        active: true,
        x: 0,
        y: -120,
        height: 100,
        width: 0,
        z: 1,
        title: 'Card 4'
      },
      {
        id: 4,
        active: true,
        x: 320,
        y: 120,
        height: 100,
        width: 300,
        z: 1,
        title: 'Card 5'
      }
    ],
  },

  actions: {
    // Getting cards data from storage
    // in current form could be used as getter but used action
    // as storage could be DB or other outer resource
    getCards(state) {
      const data = localStorage.getItem("cards");
      let cards = state.getters.cardsDefault;
      if (data && data !== "undefined") {
        cards = JSON.parse(data);
      }

      return { cards };
    },

    // Saving cards to outer storage
    saveCards(state, payload) {
      if (payload.cards !== undefined) {
        localStorage.setItem("cards", JSON.stringify(payload.cards));
      }
    },

    // Saving cards to outer storage
    resetCards(state) {
      localStorage.removeItem("cards");
      return { cards: state.getters.cardsDefault };
    }
  },

  getters: {
    cardsDefault(state) {
      return state.cardsDefault;
    }

  },
  mutations: {}
});
