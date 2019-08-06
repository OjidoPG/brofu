<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default  {
    computed: {
      layout() {
        return '@/layouts/' + (this.$router)
      }
    }
  }
</script>
