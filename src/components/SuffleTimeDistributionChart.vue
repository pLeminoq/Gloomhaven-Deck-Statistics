<script>
import SimulationBarChart from './SimulationBarChart';

export default {
  name: 'ShuffleTimeDistribution',
  extends: SimulationBarChart,
  data: function() {
    return {
      turns: 0,
      turnsPerStep: 120,
      baseDamage: 3,
      damageDist: {},
      smallestChange: 0.001,
      label: 'Distribution of Shuffle Time',
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
      console.log(Object.getOwnPropertyNames(this.damageDist));
      let xs = [];
      let ys = [];
      console.log(damageValues);
      for (let i = Math.min(...damageValues); i <= Math.max(...damageValues); ++i){

        xs.push(i)
        if (this.damageDist['' + i] === undefined){
          ys.push(0)
        }
        else{
          ys.push(this.damageDist['' + i] / this.turns)
        }
      }
      console.log(xs);
      console.log(ys);
      return {
        xs: xs,
        ys: ys
      }
    },

    step: function(deck) {
      console.log('step');
      for (let i=0; i < this.turnsPerStep; i++) {
        const key = '' + deck.damage(this.baseDamage);
        if (this.damageDist[key] === undefined) {
          this.damageDist[key] = 0;
        }
        this.damageDist[key]++;
      }
      this.turns += this.turnsPerStep;

      console.log(this.damageDist);
      return this.computeData();
    },

    reset: function() {
      console.log('reset');
      this.turns = 0;
      this.damageDist = {};
      return this.computeData();
    },

    converged: function(newValues, currentValues) {
      console.log('converged');
      const newYs = newValues.ys;
      const currentYs = currentValues.ys;
      console.log(newYs);
      console.log(currentYs);
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
