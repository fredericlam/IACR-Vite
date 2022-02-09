<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Navigation from './components/Navigation.vue' ;

</script>

<template>
  
  <img alt="IACR" src="./assets/logo-iacr.png" />
  

  <Navigation />
  <router-view />

</template>

<style>
#app {
  font-family: "Source Sans Pro", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  padding: 0 ;
  max-width: 1280px;
  margin: auto;
}
</style>
