<template>
  <div class="dashboard">
    <div
      v-if="loading"
      class="loading"
    >
      Loading...
    </div>
    <div v-else class="content">
      <h1>Dashboard</h1>
      <div class="dash">
        <vue-draggable-resizable
          v-for="(card, index) in cards"
          :key="index"
          :grid="[10,10]"
          :parent="true"
          :w="card.width"
          :h="card.height"
          :x="card.x"
          :y="card.y"
          :z="card.z"
          :axis="`both`"
          className="vdr card"
          classNameActive="active"
          @dragging="(left, top) => onDrag(index, left, top)"
          @resizing="(x, y, width, height) => onResize(index, x, y, width, height)"
          @activated="onActivated(index)"
          @deactivated="onDeactivated(index)"
        >
          <div class="card__title">
            {{ card.title }}
          </div>

          <div class="card__body">
            X: {{ card.x }} / Y: {{ card.y }} / Z: {{ card.z }}
            - Width: {{ card.width }} / Height: {{ card.height }}
          </div>
        </vue-draggable-resizable>
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

  mounted() {
    // move getting cards into VUEX
    const cards = JSON.parse(localStorage.getItem("cards"));
    if (cards) {
      this.cards = cards;
    } else {
      this.cards = [
        {
          id: 0,
          x: 10,
          y: 10,
          height: 100,
          width: 300,
          z: 1,
          title: 'Card 1'
        },
        {
          id: 1,
          x: 320,
          y: 10,
          height: 100,
          width: 300,
          z: 1,
          title: 'Card 2'
        },
        {
          id: 2,
          x: 630,
          y: 10,
          height: 100,
          width: 300,
          z: 1,
          title: 'Card 3'
        },
        {
          id: 3,
          x: 10,
          y: 120,
          height: 100,
          width: 300,
          z: 1,
          title: 'Card 4'
        },
        {
          id: 4,
          x: 320,
          y: 120,
          height: 100,
          width: 300,
          z: 1,
          title: 'Card 5'
        }
      ];
    }
  },

  data: () => ({
    loading: false,
    cards: []
  }),

  methods: {
    onResize(index, x, y, width, height) {
      this.cards[index].x = x;
      this.cards[index].y = y;
      this.cards[index].width = width;
      this.cards[index].height = height;
      localStorage.setItem("cards", JSON.stringify(this.cards));
    },

    onDrag(index, x, y) {
      this.cards[index].x = x;
      this.cards[index].y = y;
      localStorage.setItem("cards", JSON.stringify(this.cards));
    },

    onActivated(index) {
      this.cards[index].z = 200;
    },

    onDeactivated(index) {
      this.cards[index].z = 1;
    }
  }
}
</script>

<style scoped lang="scss">
.dash {
  width: 100%;
  height: 100vh;
  border: 1px solid red;
  position: relative;
}

.card {
  border-radius: 3px;
  background: #FFFFFF;
  border: 1px solid darkgrey;

  &__title {
    padding: 5px 10px;
    background-color: #cadcff;
  }

  &__body {
    padding: 10px;
    font-size: 9px;
    display: flex;
    height: 100%;
    align-items: flex-end;
  }

  &.active {
    border: 1px solid orangered;
  }
}
</style>
