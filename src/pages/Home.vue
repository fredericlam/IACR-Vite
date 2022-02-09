<template>

	<HelloWorld msg="The International Association of Cancer Registries (IACR)" />

</template>

<script>
import { reactive,computed,onMounted } from "vue";
import { useStore } from 'vuex' ;
import HelloWorld from '../components/HelloWorld.vue' ;
 
export default {
	name : 'home' , 
	components : { HelloWorld } , 
	setup(){ 
		onMounted(() => {

   	})
   	
   	const store = useStore()
  	
  	return {
	  
	  }
	},
	data() {
    return {
    }
	},
	created(){	
	},
	mounted(){
	},
	unmounted() {
  }
  
}

</script>