<template>
  <div class="dashboard">
    <div
      v-if="loading"
      class="loading"
    >
      Loading...
    </div>
    <div v-else class="content">
      <h1>Dashboard</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',

  data: () => ({
    loading: false
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
