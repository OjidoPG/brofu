<template>
  <div id="app">
    <component
      :is="layout"
    >
      <router-view/>
    </component>
  </div>
</template>

<script>
  import Vue from 'vue'
  import AccueilLayout from './layouts/AccueilLayout'
  import InscriptionLayout from './layouts/InscriptionLayout'

  Vue.component('AccueilLayout', AccueilLayout)
  Vue.component('InscriptionLayout', InscriptionLayout)

  export default  {
    computed: {
      layout() {
        return this.$route.meta.layout
      }
    }
  }
</script>
