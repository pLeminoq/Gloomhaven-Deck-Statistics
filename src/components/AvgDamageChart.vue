<template>
  <div id="average-damage-chart">
    <BarChart
      id="chart"
      :chart-data="chartData"
    />
  </div>
</template>

<script>
import BarChart from './BarChart.vue'

export default {
  name: 'AvgDamageChart',
  components: {
    BarChart
  },
  data: function() {
    return {
      baseDamages: [0, 1, 2, 3, 4, 5]
    }
  },
  props: {
    deck: {
      require: true,
      type: Object
    }
  },
  computed: {
    avgDamage: function() {
      return this.baseDamages.map(baseDamage =>
        this.computeAvgDamage(baseDamage, this.deck.copy()));
    },
    chartData: function() {
      return {
        labels: this.baseDamages.map(val => '' + val),
        datasets: [{
          label: 'Average Damage',
          data: this.avgDamage
        }]
      };
    }
  },
  methods: {
    computeAvgDamage: function(baseDamage, deck) {
      deck.shuffle();

      const turns = 500;
      let averageDamage = 0.0;
      console.log('Ich mache was 2.0')
      for (let i = 0; i < turns; ++i) {
        let card = deck.draw();
        while (card.roller) {
          averageDamage += Math.max(card.damage(baseDamage),0);
          card = deck.draw();
        }
        averageDamage += Math.max(card.damage(baseDamage),0);

      }
      deck.restore();

      return averageDamage / turns;
    }
  }
}
</script>

<style scoped>
#chart {
  width: 45%
}
</style>
