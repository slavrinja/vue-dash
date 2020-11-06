<template>
  <div class="transaction">
    <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-else class="content">
      <h1>Transaction</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Transaction',

  data: () => ({
    loading: false
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
