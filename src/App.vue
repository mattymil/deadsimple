<template>
  <div id="app">
    <header-comp></header-comp>
    <router-view></router-view>
  </div>
</template>

<script>
  import headerComp from './components/headerComp.vue'
  
  export default {
    name: 'app',
    components: {
      headerComp
    }}
</script>

<style lang="sass">
  @import "./node_modules/bulma/sass/utilities/initial-variables";
  @import './node_modules/bulma/bulma';
</style>


