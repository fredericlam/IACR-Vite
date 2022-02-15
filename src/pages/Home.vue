<template>

	<div class="container">

		<h1>The International Association of Cancer Registries (IACR)</h1>
		
		<!--<HelloWorld msg="The International Association of Cancer Registries (IACR)" />-->

	  	<div class="row">

		    <div class="col">
		      <img alt="IACR" class="img-fluid" src="../assets/img/IACR-1.png" />
		    </div>

		    <div class="col">
		      <img alt="IACR" class="img-fluid" src="../assets/img/IACR-2.png" />
		    </div>

	  	</div>

	  	<div class="row">
	  		<div class="col">
	  			<h2>Welcome to IACR</h2>
	  			<p>Cancer Incidence in Five Continents (CI5) Volume XII: Ongoing Call</p>

				<p>Volume XII: Call for Data documents (see tab Publications: CI5 for details)
				Volume XI: IARC Scientific Publication No. 166: Cancer Incidence in Five Continents, Vol XI 
				(The PDF publication is available via IARC Publications as a free download).</p>

				<p>The CI5 series, a collaboration between the International Agency for Research on Cancer (IARC) and the International Association of Cancer Registries (IACR), presents comparable data on cancer incidence for all countries around the world for which high-quality data have been made available by population-based cancer registries.</p>

				<p>CI5 is an invaluable source of information about the global burden and distribution of cancer. CI5-XI has a wider coverage than any previous volume, presenting high-quality standardized data for cancers diagnosed during the period 2008–2012 from 343 cancer registries in 65 countries. The data published in all 11 volumes of CI5 are also accessible on the CI5 website, where users can explore the incidence figures and trends using online analysis tools.</p>
	  		</div>
	  	</div>
	</div>

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