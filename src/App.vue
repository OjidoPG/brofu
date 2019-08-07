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

  Vue.component('AccueilLayout', AccueilLayout)

  export default  {
    computed: {
      layout() {
        return this.$route.meta.layout
      }
    }
  }
</script>
