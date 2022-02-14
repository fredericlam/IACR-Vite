<template>

	<div class="page-registry">
		
		<div class="container">

			<div class="row">
			    <div class="col">
					<h1>{{ registry.id_label }}</h1>
				</div>
			</div>
		</div>

		<div class="container">

			<div class="row">
			    <!--<div class="col">
			    	<div class="card">
			    		<div class="card-body">
						    <h5 class="card-title">General information</h5>
						    <p class="card-text">
						    	<ul class="list-group">
								  <li class="list-group-item">Country code: {{ registry.id_code }}</li>
								  <li class="list-group-item">A second item</li>
								  <li class="list-group-item">A third item</li>
								  <li class="list-group-item">A fourth item</li>
								  <li class="list-group-item">And a fifth one</li>
								</ul>
						    </p>
					  	</div>
			    	</div>
			    </div>-->
			    <div class="col">
			  		<div class="card">
			    		<div class="card-body">
						    <h2 class="card-title">{{ chapter_one.title }}</h2>
						    <p class="card-text">
						    	{{ chapter_one.text }}
						    </p>
						    <figure class="figure figure-registry" v-for="graphic in chapter_one.graph">
					    		<a :href="graphic.url" target="_blank">
							  	<img :src="graphic.picture" class="figure-img img-fluid rounded" :alt="graphic.title"></a>
							  	<figcaption class="figure-caption text-center">{{ graphic.title }}</figcaption>
							  	
							</figure>
					  	</div>
			    	</div>
			    </div>
			    <div class="col">
			    	<div class="card">
			    		<div class="card-body">
						    <h2 class="card-title">Globe</h2>
						    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
					  	</div>
			    	</div>
			    </div>
		  	</div>

		  	<div class="row">

		  		<div class="col">
			  		<div class="card">
			  			<div class="card-body">
					  		<h2 class="card-title">{{ chapter_two.title }}</h2>

					  		<div class="subchapter" v-for="(subchapter,cpt) in chapter_two.subchapter">
					  			
						    	<h3>{{ subchapter.title }}</h3>
						    	<p>{{ subchapter.text }}</p>

						    	<div class="container" v-if="subchapter.graph.length <= 2">
						    		<div class="row">

						    			<!-- block with number of graphics <= 2 -->
						    			<div class="col-md-6" v-for="(graphic,cpt) in subchapter.graph">
						    				<figure class="figure figure-registry">
								    			<a :href="graphic.url" target="_blank">
										  		<img :src="graphic.picture" class="figure-img img-fluid rounded" :alt="graphic.title"></a>
										  		<figcaption class="figure-caption text-center">{{ graphic.title }}</figcaption>
											</figure>
						    			</div>
						    		</div>
						    	</div>

						    	<!-- block with number of graphics > 2 -->
				    			<div v-if="subchapter.graph.length > 2">
					    			
					    			<div class="row">
					    				<div class="col-md-8">
						    				<h4>##Horizontal mode</h4>
											<ul class="nav nav-tabs" :id="'tabs-horizontal-link-'+subchapter.num_chapter" role="tablist">
											  <li class="nav-item"  role="presentation" v-for="(graphic,cpt) in subchapter.graph">
											    <button :class="{ active: (cpt==0) , 'nav-link' : true }" :id="'h-pills-'+subchapter.num_chapter+'-'+cpt+'-tab'" data-bs-toggle="pill" :data-bs-target="'#h-pills-'+subchapter.num_chapter+'-'+cpt" type="button" role="tab" :aria-controls="'h-pills-'+subchapter.num_chapter+'-'+cpt">Graphic {{ cpt+1 }}</button>
											  </li>
											</ul>
											<div class="tab-content" :id="'tabs-horizontal-content-'+subchapter.num_chapter">
											  	<div :class="{ active: (cpt==0) , 'tab-pane' : true , 'fade' : true , 'show' : true }" v-for="(graphic,cpt) in subchapter.graph" :id="'h-pills-'+subchapter.num_chapter+'-'+cpt" role="tabpanel" :aria-labelledby="'h-pills-'+subchapter.num_chapter+'-'+cpt">
											  		<figure class="figure figure-registry">
										    			<a :href="graphic.url" target="_blank">
												  		<img :src="graphic.picture" class="figure-img img-fluid rounded" :alt="graphic.title"></a>
												  		<figcaption class="figure-caption text-center">{{ graphic.title }}</figcaption>
													</figure>
												</div>
											</div>
										</div>
									</div>
									<div class="row">
										<div class="col-md-9">
											<h4>##Vertical mode</h4>
											<div class="d-flex align-items-start">
												<div class="nav flex-column nav-pills me-3" :id="'tabs-vertical-tab-'+subchapter.num_chapter" role="tablist" aria-orientation="vertical">
													<button :class="{ active: (cpt==0) , 'nav-link' : true }" :id="'v-pills-'+subchapter.num_chapter+'-'+cpt+'-tab'" data-bs-toggle="pill" :data-bs-target="'#v-pills-'+subchapter.num_chapter+'-'+cpt" type="button" role="tab" :aria-controls="'v-pills-'+subchapter.num_chapter+'-'+cpt"  v-for="(graphic,cpt) in subchapter.graph">Graphic {{ cpt+1 }}</button>
												</div>
												<div class="tab-content" :id="'tabs-vertical-content-'+subchapter.num_chapter">
													<div :class="{ active: (cpt==0) , 'tab-pane' : true , 'fade' : true , 'show' : true }" v-for="(graphic,cpt) in subchapter.graph" :id="'h-pills-'+subchapter.num_chapter+'-'+cpt" role="tabpanel" :aria-labelledby="'v-pills-'+subchapter.num_chapter+'-'+cpt">
											  		<figure class="figure figure-registry">
										    			<a :href="graphic.url" target="_blank">
												  		<img :src="graphic.picture" class="figure-img img-fluid rounded" :alt="graphic.title"></a>
												  		<figcaption class="figure-caption text-center">{{ graphic.title }}</figcaption>
													</figure>
												</div>
												</div>
											</div>
										</div>

									</div>

								</div>

								<!--<div class="tab-content" id="pills-tabContent">
									<div :class="{ active: (cpt==0) , 'tab-pane' : true , 'fade' : true , 'show' : true }" v-for="(graphic,cpt) in subchapter.graph" :id="'pills-'+subchapter+'-'+cpt" role="tabpanel" :aria-labelledby="'pills-'+subchapter.num_chapter+'-'+cpt">
								  </div>
								</div>-->

								    
					  		</div>

						</div>

					</div>
				</div>

		  	</div>

		</div>

	</div>

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
    		population_id : 0 , 
    		registry_slug : '' , 
    		registry : {} , 
    		chapter_one : {}, 
    		chapter_two : {},
    		path : `http://gcodev.nanga.iarc.lan/iacr_lektor/data/IACR_report/`,
    		ext : 'png'
    	}
	},
	created(){	
	},
	mounted(){

		this.population_id = parseFloat( this.$route.params.population_id ) ; 
		this.registry_slug = this.$route.params.registry_slug ; 

		let meta_url = `${this.path}${this.population_id}/meta.json` ; 

		fetch( meta_url )
		    .then(response => response.json())
		    .then(registry =>{

		    	this.registry = registry ; 
		       	
		       	// console.log("this.registry",this.registry) ; 

		       	if ( this.registry.chapter[0] != undefined ){
		       		
		       		this.chapter_one = this.registry.chapter[0] ; 
		       		this.chapter_one = this.setGraphicPath( this.chapter_one ) ; 
		       		//console.info("this.chapter_one",this.chapter_one) ; 
		       	}	

		       	if ( this.registry.chapter[1] != undefined ){
		       		this.chapter_two = this.registry.chapter[1] ;
		       		console.info("this.chapter_two",this.chapter_two) ; 

		       		this.chapter_two.subchapter.forEach((s)=>{
	       				s = this.setGraphicPath(s) ; 
	       				console.info("s",s) ; 
	       			})
		       	}
		       		

		       	

    		});

	},
	unmounted() {
  	}, 

  	methods : {

  		setGraphicPath : function( obj ){

  			obj.graph.forEach((g)=>{
  				if ( g.file != undefined ) 
  					g.picture = `${this.path}${this.population_id}/${g.file}.${this.ext}` ; 
  			})
  			
  			console.info("obj",obj) ; 
  			return obj ; 
  		}
  	}
  
}

</script>

<style lang="scss">

.page-registry{
	padding: 50px 0 ;
	h1{
		text-transform: uppercase;
		font-weight: 900;
	}

	.col{
		.card{

			.nav-pills .nav-link{
				min-width: 100px;
				text-align: left;
			}

			.subchapter{
				
				border-top: solid 1px #ccc ; 
				padding-top: 20px; 
			}

			.figure-registry{
				display: block;
				.figure-img{
					line-height: 1;
				    max-height: 600px;
				    display: block;
				    margin: auto;
				}
			}

			h4{

			}
		}
	}
}

</style>
