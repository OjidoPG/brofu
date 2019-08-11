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
  import InscriptionLayout from './layouts/InscriptionLayout'
  import AccueilLayout from './layouts/AccueilLayout'
  import AdminLayout from './layouts/AdminLayout'

  Vue.component('InscriptionLayout', InscriptionLayout)
  Vue.component('AccueilLayout', AccueilLayout)
  Vue.component('AdminLayout', AdminLayout)

  export default  {
    computed: {
      layout() {
        return this.$route.meta.layout
      }
    }
  }
</script>
