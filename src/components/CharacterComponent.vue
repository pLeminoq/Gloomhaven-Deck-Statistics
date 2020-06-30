<template>
  <div id="charactercomponent">
    <ul id="perklist">
      <li v-for="perk in characterDeck.perks" :key="perk.perk.constructor.name">
          <ul id="checkboxlist">
            <li v-for="i in perk.count" :key="i">
                    <input type="checkbox" @click="onClick($event, perk.perk)"/>
            </li>
          </ul>
          {{perk.perk.constructor.name}}
      </li>
    </ul>

  </div>
</template>


<script>
const model = require('../model/character.js')
export default {
  name: 'CharacterComponent',
  components: {},
  data: function() {
    return {
      characterDeck: new model.Scoundrel(),
    }
  },
  props: {
    deck: {
      require: true,
      type: Object
    }
  },
  methods: {
    onClick: function(ev, perk){
      console.log(ev.target.checked);
      console.log('before:');
      this.deck.print()
      if (ev.target.checked){
        perk.activate(this.deck);
      }
      else {
        perk.deactivate(this.deck);
      }
      console.log('after:')
      this.deck.print()
    }
  }
}
</script>


<style>
  #checkboxlist {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: inline;
  }
  #checkboxlist > li {display: inline}
  #perklist {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
</style>
