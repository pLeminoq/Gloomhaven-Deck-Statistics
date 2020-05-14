<template>
  <div id="app">
    <button
      id="testbutton"
      @click="onButtonClick"
    >
      Add a critical Hit!
    </button>
    <AvgDamageChart
      :deck="deck"
    />
  </div>
</template>

<script>
const model = require('./model');

import AvgDamageChart from './components/AvgDamageChart.vue';

export default {
  name: 'App',
  components: {
    AvgDamageChart
  },
  data: function() {
    return {
      deck: new model.decks.Default(),
    }
  },
  methods: {
    onButtonClick: function() {
      this.deck.addCard(new model.cards.CriticalHit());
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#testbutton {
  width: 20%;
  height: 10%;
}
</style>
