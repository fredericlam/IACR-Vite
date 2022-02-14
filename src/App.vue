<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Navigation from './components/Navigation.vue' ;


</script>

<template>
  
  <header>
    <div class="container-md">
      <img alt="IACR" src="./assets/logo-iacr.png" />
    </div>

  </header>

  <main class="page-content container-md">
    
    <Navigation />

    <router-view />

  </main>

  <footer>

  </footer>

</template>

<style lang="scss">
#app {
  font-family: "Source Sans Pro", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  header{
    background: #0d3453 ; 
    max-height: 80px;
    img{ 
      max-height: 80px;
    }
  }

  h1,h2,h3,h4,h5{
    font-weight: 700;
  }

  .row+.row {
    margin-top: 1.4rem;
  }

  main.page-content{
    text-align: left ; 
    p{

    }
  }

}
</style>
