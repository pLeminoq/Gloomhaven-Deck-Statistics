<template>
  <div id="charactercomponent">
    <ul>
      <li v-for="perk in characterDeck.perks" :key="perk.perk.constructor.name">
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
  methods: {}
}
</script>
