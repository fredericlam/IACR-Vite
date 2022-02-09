<template>

	<h1>History and aims of the association</h1>
	<p>
	The International Association of Cancer Registries (IACR) was founded in 1966, as a professional society dedicated to fostering the aims and activities of cancer registries worldwide. It is primarily for population-based registries, which collect information on the occurrence and outcome of cancer in defined population groups (usually the inhabitants of a city, region, or country). For each new cancer case, registries record details of the individual affected, the nature of the cancer, information on treatment, and on follow-up specially with respect to survival from the disease.</p>
	<p>
	Registries play an important role in research into the cause of cancer, both by providing data on patterns and trends, and in different types of epidemiological study (in particular, in their ability to follow up groups of persons exposed to potential hazard). They comprise an essential element in the planning and monitoring of cancer control strategies, and for identifying priorities in public health.
	</p>
</template>

<script>
import { reactive,computed,onMounted } from "vue";
import { useStore } from 'vuex' ;
 
export default {
	name : 'about' , 
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