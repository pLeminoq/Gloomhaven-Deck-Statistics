<template>
  <div id="damage-hist">
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
      baseDamage: 1
    }
  },
  props: {
    deck: {
      require: true,
      type: Object
    }
  },
  computed: {
    chartData: function() {
      const DamageDist = this.computeDamageDist(this.baseDamage, this.deck);
      const damageValues = Object.getOwnPropertyNames(DamageDist).map(key => parseInt(key));
      let xs = [];
      let ys = [];
      for (let i = Math.min(damageValues); i <= Math.max(damageValues); ++i){
        xs.push(i)
        if (DamageDist['' + i] === undefined){
          DamageDist['' + i] = 0
        }
        ys.push(DamageDist['' + i])
      }
      return {
        labels: xs,
        datasets: [{
          label: 'Damage Distribution',
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
    }
  }
}
</script>

<style scoped>
#chart {
  width: 45%
}
</style>
