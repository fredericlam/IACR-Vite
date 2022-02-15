<template>
  <ul class="nav" id="main-nav">
    <li v-for="nav in navigation">
      <router-link :to="nav.route">{{ nav.label }}</router-link>
    </li>
  </ul>
  
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  navigation: Array
})

const navigation = [
  { route : '/' , label : 'Home' },
  { route : 'about' , label : 'About' },
  { route : 'registries' , label : 'Registries list' },
  { route : 'registries-map' , label : 'Registries map' },
  { route : 'contact' , label : 'Contact' }
] ; 

</script>

<style lang="scss">
a{
  color: #2c3e50 ; 
}
.nav#main-nav{
  li{
    padding: 20px; 
    list-style-type: none ; 
    display: inline ;
  }
}
</style>
