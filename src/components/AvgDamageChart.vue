<template>
  <div id="average-damage-chart">
    <canvas id="avg-chart" />
  </div>
</template>

<script>
const Chart = require('chart.js');

export default {
  name: 'AvgDamageChart',
  data: function() {
    return {
      chart: undefined,
      stopComputation: false,
      computationPromise: undefined,
      turns: 0,
      damageSums: [0, 0, 0, 0, 0, 0],
      averages: [0, 0, 0, 0, 0, 0],
      roundedAvgs: [0, 0, 0, 0, 0, 0],
      baseDamages: [0, 1, 2, 3, 4, 5],
      smallestChange: 0.01,
      graphUpdateTimeInMS: 100,
    }
  },
  props: {
    deck: {
      require: true,
      type: Object
    }
  },
  mounted: function() {
    console.log('Mounted so create chart!');
    const ctx = document.getElementById('avg-chart').getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.baseDamages,
        datasets: [{
          label: 'Average Damage',
          data: this.roundedAvgs
        }]
      },
      options: {}
    });

    console.log('Start initial simulation!');
    this.computationPromise = this.simulateAvgDamage(this.deckCopy);
  },
  watch: {
    deckCopy: async function(newValue) {
      console.log('Deck changed!');
      if (this.computationPromise !== undefined) {
        console.log('Stop simulation!');
        this.stopComputation = true;
        await this.computationPromise;
        console.log('Simulation stopped!');
      }

      this.simulateAvgDamage(newValue);
    }
  },
  computed: {
    deckCopy: function() {
      return this.deck.copy();
    },
  },
  methods: {
    simulateAvgDamage: async function(_deck) {
      if (this.stopComputation) {
        this.stopComputation = false;
        this.turns = 0; 
        this.damageSum = [0, 0, 0, 0, 0, 0];
        for (let i in this.averages) {
          this.averages[i] = 0;
        }
        this.chart.update(this.graphUpdateTimeInMS);
      }

      setTimeout(() => {
        // update damage sums
        for (let i in this.baseDamages) {
          const baseDamage = this.baseDamages[i];
          for (let j = 0; j < 100; j++) {
            this.damageSums[i] += _deck.damage(baseDamage);
          }
        }
        this.turns += 100;
        console.log(this.damageSums + ' - ' + this.turns);

        // update chart data and chart
        let continueIteration = false;
        for (let i in this.averages) {
          const avg = this.damageSums[i] / this.turns;
          if (Math.abs(avg - this.averages[i]) > this.smallestChange) {
            continueIteration = true;
          }
          this.averages[i] = avg;
          this.roundedAvgs[i] = Math.round((avg +Number.EPSILON) * 100) / 100;
          this.chart.update(this.graphUpdateTimeInMS);
        }

        // continue simulation
        if (continueIteration) {
          console.log('Continue Iteration');
          this.computationPromise = this.simulateAvgDamage(_deck);
        } else {
          console.log('Stop iterating because change is to small');
        }
      }, this.graphUpdateTimeInMS);
    },
  }
}
</script>

<style scoped>
#avg-chart {
  width: 45%
}
</style>
