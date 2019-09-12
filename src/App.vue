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
  import BrocanteursLayout from './layouts/BrocanteursLayout'
  import EmplacementsLayout from './layouts/EmplacementsLayout'
  import FinancesLayout from './layouts/FinancesLayout'
  import MailsLayout from './layouts/MailsLayout'

  Vue.component('InscriptionLayout', InscriptionLayout)
  Vue.component('AccueilLayout', AccueilLayout)
  Vue.component('AdminLayout', AdminLayout)
  Vue.component('BrocanteursLayout', BrocanteursLayout)
  Vue.component('EmplacementsLayout', EmplacementsLayout)
  Vue.component('FinancesLayout', FinancesLayout)
  Vue.component('MailsLayout', MailsLayout)

  export default  {
    computed: {
      layout() {
        return this.$route.meta.layout
      }
    }
  }
</script>
