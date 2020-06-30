<script>
import SimulationBarChart from './SimulationBarChart';

export default {
  name: 'ShuffleTimeDistribution',
  extends: SimulationBarChart,
  data: function() {
    return {
      turns: 0,
      turnsPerStep: 400,
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
      let xs = [];
      let ys = [];
      //let expectedTurns = 0
      for (let i = Math.min(...damageValues); i <= Math.max(...damageValues); ++i){

        xs.push(i)
        if (this.damageDist['' + i] === undefined){
          ys.push(0)
        }
        else{
          ys.push(this.damageDist['' + i] / this.turns)
        }
        //expectedTurns += i*this.damageDist['' + i] / this.turns
      }
      //console.log(expectedTurns);
      return {
        xs: xs,
        ys: ys
      }
    },

    step: function(deck) {
      let turns2shuffle = 1;
      for (let i=0; i < this.turnsPerStep; i++) {
        if (deck.status()) {
          //console.log(turns2shuffle);
          const key = '' + turns2shuffle;
          if (this.damageDist[key] === undefined) {
            this.damageDist[key] = 0;
          }
          this.damageDist[key]++;
          turns2shuffle = 1;
          this.turns ++;
        }
        else {
          turns2shuffle++;
        }
      }

      return this.computeData();



    },

    reset: function() {
      this.turns = 0;
      this.damageDist = {};
      return this.computeData();
    },

    converged: function(newValues, currentValues) {
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
