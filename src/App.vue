<template>
  <div id="app">
    <nav class="nav">
      <router-link to="/dashboard" class="nav-link">
        DASHBOARD
      </router-link>
      <router-link to="/transactions" class="nav-link">
        TRANSACTIONS
      </router-link>
    </nav>
    <div class="row">
      <div class="col-12">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {}
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
</style>
