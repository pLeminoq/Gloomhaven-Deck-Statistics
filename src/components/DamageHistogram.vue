<template>
  <div id="damage-hist">
    <button
      id="baseDamageDown"
      @click="onButtonDown"
    >
      -
    </button>
    <button
      id="baseDamageUp"
      @click="onButtonUp"
    >
      +
    </button>
    <BarChart
      id="chart"
      :chart-data="chartData"
    />
  </div>
</template>

<script>
import BarChart from './BarChart.vue'

export default {
  name: 'DamageHistogram',
  components: {
    BarChart
  },
  data: function() {
    return {
      baseDamage: 1,
      damageDist: {}
    }
  },
  props: {
    deck: {
      require: true,
      type: Object
    }
  },

  watch: {
    deck: function(val){
      console.log('Hallo Tamino')
      this.damageDist = this.computeDamageDist(this.baseDamage, val.copy());
      for (let i=0; i<10; ++i){
        let tempDamageDist = this.computeDamageDist(this.baseDamage, val.copy());
        for (let propertyName in tempDamageDist){
          if (this.damageDist[propertyName] === undefined){
            this.damageDist[propertyName] = tempDamageDist[propertyName]
          }
          else {
            this.damageDist[propertyName] += tempDamageDist[propertyName]
          }
        }
      }
    }
  },
  computed: {
    chartData: function() {
      const damageValues = Object.getOwnPropertyNames(this.damageDist).map(key => parseInt(key));
      let xs = [];
      let ys = [];
      for (let i = Math.min(...damageValues); i <= Math.max(...damageValues); ++i){

        xs.push(i)
        if (this.damageDist['' + i] === undefined){
          ys.push(0)
        }
        else{
          ys.push(this.damageDist['' + i])
        }

      }
      return {
        labels: xs,
        datasets: [{
          label: 'Damage Distribution for Base Attack of ' + this.baseDamage,
          data: ys
        }]
      };
    }
  },
  methods: {
    computeDamageDist: function(baseDamage, deck) {

      deck.shuffle();

      const turns = 1000;
      let damageDist = {};
      console.log('Ich mache was')
      for (let i = 0; i < turns; ++i) {
        let attackDamage = 0;
        let card = deck.draw();
        while (card.roller) {
          attackDamage += card.damage(baseDamage);
          card = deck.draw();
        }
        attackDamage += card.damage(baseDamage);
        if  (damageDist['' + attackDamage] === undefined){
          damageDist['' + attackDamage] = 0;
        }
        damageDist['' + attackDamage] += 1;

      }
      deck.restore();

      return damageDist;
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
#chart {
  width: 45%
}
</style>
