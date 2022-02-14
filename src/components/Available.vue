<template>
  <CloseOutline aria-label="Non available" class="valid" v-if="available==false"/>
  <CheckmarkOutline aria-label="Available" class="unvalid" v-if="available==true"/>
</template>

<script>
import { ref } from 'vue'
import { CarbonIconsVue } from '@carbon/icons-vue';
import CheckmarkOutline from '@carbon/icons-vue/es/checkmark--outline/16';
import CloseOutline from '@carbon/icons-vue/es/close--outline/16';


export default {
  name : 'available_component' , 
  components : { CheckmarkOutline , CloseOutline  } , 
  props: {
    'available' : { type: Boolean , default: false }
  },
  setup(){ 
  },
  created(){  
  }
  
}

</script>

<style lang="scss">
.unvalid{
  color: rgb(74 222 128);
}

.valid{
  color:rgba(248,113,113);
}

</style>