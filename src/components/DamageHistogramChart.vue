<script>
import SimulationBarChart from './SimulationBarChart';

export default {
  name: 'DamageHistogramChart',
  extends: SimulationBarChart,
  data: function() {
    return {
      turns: 0,
      turnsPerStep: 120,
      baseDamage: 3,
      damageDist: {},
      smallestChange: 0.001,
      label: 'Damage Histogram',
      options: {
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              //suggestedMax: 1
            }
          }]
        }
      }
    }
  },

  methods: {
    computeData() {
      const damageValues = Object.getOwnPropertyNames(this.damageDist).map(key => parseInt(key));
      damageValues.pop();
      let xs = [];
      let ys = [];
      for (let i = Math.min(...damageValues); i <= Math.max(...damageValues); ++i){

        xs.push(i)
        if (this.damageDist['' + i] === undefined){
          ys.push(0)
        }
        else{
          ys.push(this.damageDist['' + i] / this.turns)
        }
      }
      return {
        xs: xs,
        ys: ys
      }
    },

    step: function(deck) {
      for (let i=0; i < this.turnsPerStep; i++) {
        const key = '' + deck.damage(this.baseDamage);
        if (this.damageDist[key] === undefined) {
          this.damageDist[key] = 0;
        }
        this.damageDist[key]++;
      }
      this.turns += this.turnsPerStep;

      return this.computeData();
    },

    reset: function() {
      this.turns = 0;
      this.damageDist = {};
      return this.computeData();
    },

    converged: function(newValues, currentValues) {
      //console.log('converged');
      const newYs = newValues.ys;
      const currentYs = currentValues.ys;
      if (newYs.length !== currentYs.length) {
        return false;
      }

      for (let i=0; i < currentYs.length; ++i) {
        if (Math.abs( newYs[i]-currentYs[i]) > this.smallestChange) {
          return false
        }
      }

      return true;
    },

    onButtonDown: function(){
      this.baseDamage = Math.max(0, this.baseDamage-1);
    },

    onButtonUp: function(){
      this.baseDamage = this.baseDamage+1;
    }
  }
}
</script>

<style scoped>
#container {
  width: 40%;
}
</style>
