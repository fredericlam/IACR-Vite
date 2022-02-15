<template>

	<h1>Registries</h1>
	<p>
		<table class="table" cellpadding="0" cellspacing="0">
			
			<thead>
				<th scope="col">Country</th>
				<th scope="col">Population</th>
				<!--<th scope="col" class="marker">Incidence</th>
				<th scope="col" class="marker">Mortality</th>
				<th scope="col" class="marker">Prevalence</th>-->
				<th scope="col">Link</th>
				<!--<th scope="col">Order</th>-->
			</thead>

			<tbody>
				<tr v-for="(registry,i) in registries">
					<td class="country_grouped">{{ registry.country_grouped }}</td>
					<td><router-link :to="registry.route">{{ registry.label }}</router-link></td>
					<!--<td class="marker center"><Available :available="registry.incidence" /></td>
					<td class="marker center"><Available :available="registry.mortality" /></td>
					<td class="marker center"><Available :available="registry.prevalence" /></td>-->
					<td>
						<router-link :to="registry.route">
							<Http aria-label="Open link"/> {{ registry.route }}
						</router-link>
					</td>
					<!--<td>{{ registry.order }}</td>-->
				</tr>
			</tbody>


		</table>
	</p>
	
</template>

<script>
import { reactive,computed,onMounted } from "vue";
import { useStore } from 'vuex' ;
import { CarbonIconsVue } from '@carbon/icons-vue';
import Http from '@carbon/icons-vue/es/http/16';
import Available from '../components/Available.vue' ;
import Func from '../func.js' ;

export default {
	name : 'Registries' , 
	components : { Available , Http } , 
	setup(){ 
		// console.info("A setup") ;
		onMounted(() => {
			//console.info("C onMounted") ;
   		})
   	
	   	const store = useStore()
	  	
	  	return {
	  	}
	},
	data() {
    	return {
    		registries : []
    	}
	},
	created(){	
		//console.info("B created") ;
	},
	mounted(){
		//console.info("D mounted") ;

		fetch('/data/registries.json')
		    .then(response => response.json())
		    .then(registries =>{

		    	let showns = [] ; 
		    	this.registries = registries.map((r)=>{
		    		r.route = `/registries/${Func.slugify(r.label)}/${r.country}/`;
		    		r.country_grouped = '' ; 
		    		if ( !showns.includes(r.grouping) ) {
		    			r.country_grouped = r.grouping 
		    			showns.push(r.grouping) ; 
		    		}
		    		return r ; 
		    	}) ; 


		    	console.table( this.registries ) ; 
		       
    		});
	},
	unmounted() {
  	}, 

  	methods : {
  		slugify__ : function( label ){
  			let slug ; 
  			return slug ; 
  		}
  	}
  
}

</script>

<style lang="scss">
table#table_regitries_list{
    width: 100%;

    th{
		background: #05D3AA;
		color: #002060;
		&.marker{
			width: 2%;
		}
	}

	tr:nth-child(even){
		background: #DAF6EE;
	}

	th,td{
		padding: 2px 5px;
		border: solid 1px #ccc;
	}

	td.center{
		text-align: center ; 
		padding: 5px 5px 0px 5px;
	}

	td a.cardLink{
		color: #002060;
	}
}

td.country_grouped{
	font-weight: 900;
}

</style>