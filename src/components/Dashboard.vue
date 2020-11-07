<template>
  <div class="dash">
    <div class="dash__table">
      <div class="dash__table-head">
        Dashboard
      </div>
      <vue-draggable-resizable
        v-for="(card, index) in activeCards"
        :key="index"
        :handles="['tl', 'tr', 'br', 'bl']"
        :h="card.height"
        :grid="[10,10]"
        :w="card.width"
        :axis="`both`"
        :parent="true"
        :x="card.x"
        :y="card.y"
        :z="card.z"
        :minWidth="100"
        :minHeight="50"
        className="vdr card"
        classNameActive="active"
        @dragging="(left, top) => onDrag(index, left, top)"
        @resizing="(x, y, width, height) => onResize(index, x, y, width, height)"
        @activated="onActivated(index)"
        @deactivated="onDeactivated(index)"
      >
        <div class="card__title">
          {{ card.title }}
          <button
            type="button"
            class="card__close"
            @click="removeCard(index)"
          >
            &#10005;
          </button>
        </div>

        <div class="card__body">
          X: {{ card.x }} / Y: {{ card.y }} / Z: {{ card.z }}
          - Width: {{ card.width }} / Height: {{ card.height }}
        </div>
      </vue-draggable-resizable>
    </div>
    <div class="dash__been">
      <div class="dash__been-head">
        Removed
      </div>
      <div class="dash__been-body">
        <div
          v-for="(card, index) in inactiveCards"
          :key="card.id"
          class="been-card"
        >
          {{ card.title }}
          <button
            type="button"
            class="been-card__restore"
            @click="restoreCard(index)"
          >
            Restore
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable';
import 'vue-draggable-resizable/dist/VueDraggableResizable.css';

export default {
  name: 'Dashboard',

  components: {
    VueDraggableResizable
  },
  data: () => ({
    loading: false,
    cards: []
  }),
  computed: {

    activeCards() {
      return this.cards.filter((item) => item.active);
    },

    inactiveCards() {
      return this.cards.filter((item) => !item.active);
    },

    parent() {
      const container = document.querySelector(".dash__table")
      if (container) {
        return {
          element: container,
          width: container.offsetWidth,
          height: container.offsetHeight
        }
      }
      return {
        element: null,
        width: 0,
        height: 0
      }
    }
  },

  mounted() {
    this.getCards();
  },

  methods: {
    getCards() {
      this.$store.dispatch('getCards').then((payload) => {
        // check and fix axis and sizes of cards base at parent;s container size
        this.cards = payload.cards.map(this.safeAxis);

        // save cards for situation if axis was changed
        // this.saveCards();
      });
    },

    saveCards() {
      this.$store.dispatch('saveCards', {
        cards: this.cards
      });
    },

    removeCard(id) {
      this.activeCards[id].active = false;
      this.saveCards();
    },

    // set biggest z-index value for current card and reset other cards
    // to raise current one
    // TODO: set z-index based at clicks history
    raiseCard(id) {
      this.cards.map((item) => {
        item.z = (item.id === id) ? 200 : 1;
        return item;
      });
    },

    // check and fix card's axis based at parent's size
    safeAxis(card) {
      if (this.parent.element !== null) {
        // Fix negatives
        card.x = card.x > 0 ? card.x : 0;
        card.y = card.y > 0 ? card.y : 0;
        card.width = card.width > 0 ? card.width : 300;
        card.height = card.height > 0 ? card.height : 100;

        // If card's coordinates are more then parent's container - we move card into parent
        if (card.x + card.width > this.parent.width) {
          card.x = this.parent.width - (card.width + 10);
        }

        if (card.y + card.height > this.parent.height) {
          card.y = this.parent.height - (card.height + 10);
        }
      }
      return card;
    },

    restoreCard(id) {
      // set defaults
      let card = this.inactiveCards[id];
      card.height = 100;
      card.width = 300;
      this.raiseCard(card.id);

      // try to center2 card
      if (this.parent.element !== null) {
        card.x = (this.parent.width / 2) - (card.width / 2);
        card.y = (this.parent.height / 2) - (card.height / 2);
        card = this.safeAxis(card);
      } else {
        card.x = 0;
        card.y = 0;
      }
      card.z = 200;

      // restore and save
      card.active = true;
      this.saveCards();
    },

    onResize(index, x, y, width, height) {
      this.activeCards[index].x = x;
      this.activeCards[index].y = y;
      this.activeCards[index].width = width;
      this.activeCards[index].height = height;
      this.saveCards();
    },

    onDrag(index, x, y) {
      this.activeCards[index].x = x;
      this.activeCards[index].y = y;
      this.raiseCard(this.activeCards[index].id);
      this.saveCards();
    },

    onActivated(index) {
      this.activeCards[index].z = 200;
      this.raiseCard(this.activeCards[index].id);
      this.saveCards();
    },

    onDeactivated(index) {
      this.activeCards[index].z = 1;
    }
  }
}
</script>

<style scoped lang="scss">
.dash {
  height: 600px;
  width: 100%;
  display: flex;
  flex-direction: row;

  &__been {
    width: 150px;
    border-radius: 3px;
    border: 1px solid #d9d9d9;
    background-color: #f5f5f5;
    margin-left: 20px;

    &-head {
      background-color: #e4e4e4;
      padding: 5px;
      font-weight: 600;
    }

    &-body {
      padding: 5px;
    }
  }

  &__table {
    border-radius: 3px;
    border: 1px solid #d9d9d9;
    position: relative;
    width: 100%;

    &-head {
      background-color: #e4e4e4;
      padding: 5px;
      font-weight: 600;
    }
  }
}

.been-card {
  padding: 3px;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
  display: flex;
  flex-flow: column;
  background: #fff;
  text-align: center;
  margin: 10px 0;

  &__restore {
    border: 1px solid #d9d9d9;
    border-radius: 3px;
    margin-top: 10px;
    outline: none;
  }
}

.card {
  border-radius: 3px;
  background: #FFFFFF;
  border: 2px solid #f6f6f6;
  -webkit-box-shadow: 2px 2px 3px -1px rgba(0, 0, 0, 0.4);
  box-shadow: 2px 2px 3px -1px rgba(0, 0, 0, 0.4);

  &__close {
    background: none;
    border: none;
    outline: none;
  }

  &__title {
    padding: 5px 10px;
    background-color: #cadcff;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__body {
    padding: 10px;
    font-size: 9px;
    display: flex;
    height: 100%;
    align-items: flex-end;
  }

  &.active {
    border: 2px solid #cadcff;
  }

  &.moving {
    border: 2px solid #cadcff;
  }

}
</style>
