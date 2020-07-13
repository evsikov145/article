<template>
  <div id="app">
   <Header/>
    <div class="content">
      <router-view>
        <Posts/>
      </router-view>
    </div>
  </div>
</template>

<script>

  import Header from './components/Header'

  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: 'App',
    components: {
      Header,
    },
    data(){
      return{
        currentUser: true
      }
    },
    methods: {
      ...mapActions([
         'GET_CURRENT_USER'
      ]),
      exitUser(){
        localStorage.removeItem('user_id');
        this.GET_CURRENT_USER();
        this.currentUser = false;
      },
    },
    computed:{
      ...mapGetters([
         'CURRENT_USER'
      ]),
    },
  }
</script>

<style lang="scss">
  html {
    background-color: lightgray!important;
  }
  ul li{
      list-style-type: none;
  }

  // Import Bulma's core
  @import "~bulma/sass/utilities/_all";

  // Set your colors
  $primary: #8c67ef;
  $primary-invert: findColorInvert($primary);
  $twitter: #4099FF;
  $twitter-invert: findColorInvert($twitter);

  // Setup $colors to use as bulma classes (e.g. 'is-twitter')
  $colors: (
          "white": ($white, $black),
          "black": ($black, $white),
          "light": ($light, $light-invert),
          "dark": ($dark, $dark-invert),
          "primary": ($primary, $primary-invert),
          "info": ($info, $info-invert),
          "success": ($success, $success-invert),
          "warning": ($warning, $warning-invert),
          "danger": ($danger, $danger-invert),
          "twitter": ($twitter, $twitter-invert)
  );

  // Links
  $link: $primary;
  $link-invert: $primary-invert;
  $link-focus-border: $primary;

  // Import Bulma and Buefy styles
  @import "~bulma";
  @import "~buefy/src/scss/buefy";



</style>
