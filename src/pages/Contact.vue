<template>

	<h1>Contact</h1>
	<p>
		International Association of
		Cancer Registries
		c/o International Agency for Research on Cancer
	</p>
	<p>
		150 cours Albert Thomas
		69372 Lyon Cedex 08
		France
		Tel. +33 (0)4 72 73 85 48 
		Fax. +33 (0)4 72 73 85 75
		Email: iacr@iarc.fr
	</p>
</template>

<script>
import { reactive,computed,onMounted } from "vue";
import { useStore } from 'vuex' ;
 
export default {
	name : 'contact' , 
	components : { } , 
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