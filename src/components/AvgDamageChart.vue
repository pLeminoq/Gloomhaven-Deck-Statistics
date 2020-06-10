<script>
import SimulationBarChart from './SimulationBarChart';

export default {
  name: 'AvgDamageChart',
  extends: SimulationBarChart,
  data: function() {
    return {
      turns: 0,
      turnsPerStep: 100,
      baseDamages: [0, 1, 2, 3, 4, 5],
      damageSums: [0, 0, 0, 0, 0, 0],
      smallestChange: 0.005,
      label: 'Average Damage',
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              suggestedMax: 5 + 1
            }
          }]
        }
      }
    }
  },
  methods: {
    reset: function() {
      this.turns = 0;
      this.damageSums = [0, 0, 0, 0, 0, 0];
      return {
        xs: this.baseDamages,
        ys: this.computeYs()
      };
    },
    computeYs: function() {
      let ys = [];
      for (let i = 0; i < this.damageSums.length; i++) {
        if (this.turns === 0) {
          ys[i] = this.baseDamages[0];
          continue;
        }

        ys[i] = this.damageSums[i] / this.turns;
        ys[i] = Math.round((ys[i] + Number.EPSILON) * 100) / 100;
      }
      return ys;
    },
    converged: function(newValues, currentValues) {
      const newYs = newValues.ys;
      const currentYs = currentValues.ys;
      if (newYs.length !== currentYs.length) {
        return false;
      }

      for (let i = 0; i < newYs.length; i++) {
        if (Math.abs(newYs[i] - currentYs[i]) > this.smallestChange) {
          return false;
        }
      }
      return true;
    },
    step: function(_deck) {
      // update damage sums
      for (let i = 0; i < this.baseDamages.length; ++i) {
        const baseDamage = this.baseDamages[i];
        for (let j = 0; j < this.turnsPerStep; j++) {
          this.damageSums[i] += _deck.damage(baseDamage);
        }
      }
      this.turns += this.turnsPerStep;

      return {
        xs: this.baseDamages,
        ys: this.computeYs()
      };
    }
  }
}
</script>

<style scoped>
#container {
  width: 45%
}
</style>
