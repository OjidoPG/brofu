<template>
  <v-app id="inspire">
    <component
      :is="layout"
    >
      <router-view/>
    </component>
  </v-app>
</template>

<script>
  import Vue from 'vue'
  import WithoutFooterLayout from './layouts/WithoutFooterLayout'
  import FullLayout from './layouts/FullLayout'

  Vue.component('WithoutFooterLayout', WithoutFooterLayout)
  Vue.component('FullLayout', FullLayout)

  export default  {
    computed: {
      layout() {
        return this.$route.meta.layout
      }
    }
  }
</script>
