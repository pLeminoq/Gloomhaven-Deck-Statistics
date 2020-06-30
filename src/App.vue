<template>
  <div id="app">
    <button
      id="testbutton"
      @click="onButtonClick"
    >
      Add a +1 roller!
    </button>
    <AvgDamageChart
      :deck="deck"
    />
    <DamageHistogram
      :deck="deck"
    />
    <ShuffleTimeDistribution
      :deck="deck"
    />
    <CharacterComponent
      :deck="deck"
    />
  </div>
</template>

<script>
const model = require('./model');

import AvgDamageChart from './components/AvgDamageChart.vue';
import DamageHistogram from './components/DamageHistogramChart.vue';
import ShuffleTimeDistribution from './components/SuffleTimeDistributionChart.vue';
import CharacterComponent from './components/CharacterComponent.vue';

export default {
  name: 'App',
  components: {
    AvgDamageChart,
    DamageHistogram,
    CharacterComponent,
    ShuffleTimeDistribution
  },
  data: function() {
    return {
      deck: new model.decks.Default(),
    }
  },
  methods: {
    onButtonClick: function() {
      this.deck.addCard(new model.cards.PlusOneRoller());
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
