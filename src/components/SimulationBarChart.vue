<template>
  <div id="container">
    <canvas id="chart" />
  </div>
</template>

<script>
const Chart = require('chart.js');

export default {
  name: 'SimulationBarChart',
  data: function() {
    return {
      chart: undefined,
      restartSimulation: false,
      simulationPromise: undefined,
      xs: [],
      ys: [],
      label: '',
      graphUpdateTimeInMS: 100,
      options: {},
    }
  },
  props: {
    deck: {
      require: true,
      type: Object
    }
  },
  computed: {
    deckCopy: function() {
      // Somehow watching the deck property does not work
      // this create a copy here and watch for this copy
      return this.deck.copy();
    },
  },
  watch: {
    deckCopy: async function(_deck) {
      if (this.simulationPromise !== undefined) {
        this.restartSimulation = true;
        await this.simulationPromise;
      }

      this.simulate(_deck);
    }
  },
  mounted: function() {
    const ctx = document.getElementById('chart').getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.xs,
        datasets: [{
          label: this.label,
          data: this.ys
        }]
      },
      options: this.options
    });

    this.simulationPromise = this.simulate(this.deckCopy);
  },
  methods: {
    reset: function() {
    },
    step: function() {
      return {
        ys: [],
        xs: []
      };
    },
    converged: function() {
      return true;
    },
    simulate: async function(_deck) {
      if (this.restartSimulation) {
        this.restartSimulation = false;
        const currentValues = this.reset();
        this.xs.length = 0;
        for (let i = 0; i < currentValues.xs.length; i++) {
          this.xs[i] = currentValues.xs[i];
        }
        this.ys.length = 0;
        for (let i = 0; i < currentValues.ys.length; i++) {
          this.ys[i] = currentValues.ys[i];
        }

        this.chart.update(this.graphUpdateTimeInMS);
      }

      setTimeout(() => {
        // update damage sums
        const currentValues = {
          xs: this.xs,
          ys: this.ys
        };
        const newValues = this.step(_deck, currentValues);

        if (this.converged(newValues, currentValues)) {
          return;
        }

        for (let i = 0; i < newValues.xs.length; i++) {
          this.xs[i] = newValues.xs[i];
        }
        for (let i = 0; i < newValues.ys.length; i++) {
          this.ys[i] = newValues.ys[i];
        }

        this.chart.update(this.graphUpdateTimeInMS);
        this.simulationPromise = this.simulate(_deck);
      }, this.graphUpdateTimeInMS);
    },
  }
}
</script>
