<template>
  <div id="app">
    <header class="header">
      <router-link to="login">Логин</router-link>
    </header>
    <router-view>
      <List/>
    </router-view>
  </div>
</template>

<script>

  import List from './components/List'

  export default {
    name: 'App',
    components: {
      List
    }
  }
</script>

<style lang="scss">
  .header {
    background-color: royalblue;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 20px;
    min-height: 60px;
    a {
      color: white;
    }
  }
</style>
