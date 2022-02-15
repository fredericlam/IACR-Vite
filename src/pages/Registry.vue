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

				<div class="col-md-3 sticky-top">

					<div class="col">
				    	<ul class="list-group" id="left-nav">
							<li :class="{ 'list-group-item' : true ,'d-flex' : true , 'justify-content-between': true, 'align-items-center' : true , 'active' : (i==0) , 'sub' : (nav.class=='sub') }" v-for="(nav,i) in left_navigation">
								<a :href="'#'+nav.id" v-on:click="clickListGroup(nav.id)">{{ nav.title }}</a>
							</li>
						</ul>
					</div>
				</div>

				<div class="col-md-9">

					<div class="row" v-if="background!={}">
						<div class="col">
					    	<div class="card" :id="'chapter-'+background.num_chapter">
					    		<div class="card-body">
								    <h5 class="card-title">{{ background.title }}</h5>
								    <p class="card-text">
								    	{{ background.text }}
								    </p>
								</div>
							</div>
						</div>
					</div>

					<div class="row">
					    
					    <div class="col">
					  		<div class="card" :id="'chapter-'+chapter_one.num_chapter">
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
					    	<RegistriesMap v-bind:width="495" v-bind:height="495" v-bind:scale="220" v-bind:hide_selector="true"/>
					    </div>
				  	</div>

				  	<div class="row">

				  		<div class="col">
					  		<div class="card" :id="'chapter-'+chapter_two.num_chapter">
					  			<div class="card-body">
							  		<h2 class="card-title">{{ chapter_two.title }}</h2>
							  		<p>{{ chapter_two.text }}</p>
							  		<div class="subchapter" v-for="(subchapter,cpt) in chapter_two.subchapter" :id="'subchapter-'+subchapter.num_chapter">
							  			
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
							    				<div class="col">
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
											<!--<div class="row">
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
											</div>-->

										</div>
										    
							  		</div>

								</div>

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
import RegistriesMap from '../components/RegistriesMap.vue'

export default {
	name : 'contact' , 
	components : { RegistriesMap } , 
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
    		background : {},
    		chapter_one : {}, 
    		chapter_two : {},
    		path : `http://gcodev.nanga.iarc.lan/media/iacr/report/`,
    		ext : 'png' , 
    		left_navigation : [] , 
    		waypoints : []
    	}
	},
	created(){	

		setTimeout(() => {
	        var elementPosition = $('#left-nav').offset();
	        $(window).scroll(()=>{
	          if( $(window).scrollTop() > 250 ){
	            $('#left-nav').addClass('fixed') ;
	          } else {
	            $('#left-nav').removeClass('fixed') ;
	          }   
	        }) ;
    	});
	},
	mounted(){

		this.population_id = parseFloat( this.$route.params.population_id ) ; 
		this.registry_slug = this.$route.params.registry_slug ; 

		let meta_url = `${this.path}${this.population_id}/meta.json` ; 

		fetch( meta_url )
		    .then(response => response.json())
		    .then(registry =>{

		    	this.registry = registry ; 

		    	let navigation = [] ;
		       	
		       	console.log("this.registry",this.registry) ; 

		       	if ( this.registry.chapter[0] != undefined ){
		       		
		       		// check if background is entered
		       		if ( this.registry.chapter.length >= 3)
		       		{
		       			this.background = this.registry.chapter[0] ; 
		       			this.chapter_one = this.registry.chapter[1] ; 
			       		this.chapter_one = this.setGraphicPath( this.chapter_one ) ; 

			       		navigation.push(this.background) ; 
		       		}
		       		else
		       		{
			       		this.chapter_one = this.registry.chapter[0] ; 
			       		this.chapter_one = this.setGraphicPath( this.chapter_one ) ; 
			       		//console.info("this.chapter_one",this.chapter_one) ; 
		       		}

		       		navigation.push(this.chapter_one) ; 
		       	}	

		       	if ( this.registry.chapter[1] != undefined ){

		       		if ( this.registry.chapter.length >= 3)
		       		{
		       			this.chapter_two = this.registry.chapter[2] ;
		       		}
		       		else
		       		{
			       		this.chapter_two = this.registry.chapter[1] ;
			       		//console.info("this.chapter_two",this.chapter_two) ; 
		       		}
		       		this.chapter_two.subchapter.forEach((s)=>{
	       				s = this.setGraphicPath(s) ; 
	       				//console.info("s",s) ; 
	       			})

	       			navigation.push(this.chapter_two) ; 
		       	}
		       		
		       	navigation.forEach( n => {

		       		let nav = { id : `chapter-${n.num_chapter}`, title : n.title , class : 'main' } ;

		       		this.left_navigation.push( nav )

		       		if ( n.subchapter.length > 0 ){

		       			n.subchapter.forEach( s => {
		       				
		       				nav = { id : `subchapter-${s.num_chapter}`, title : s.title , class : 'sub' } ;
		       				this.left_navigation.push( nav )

		       			});
		       		}
		       	}); 

		       	setTimeout(()=>{
			       	this.left_navigation.forEach( n => {
			       		// console.info("===>",n) ; 
			       		let waypoint = new Waypoint({
				          element: $(`#${n.id}`),
				          handler: ()=> {
				            this.manageClassList(`${n.id}`)
				          }
				        })
			       		this.waypoints.push( waypoint ) ; 
			       	}) ;
			    },2000); 

		       	if ( document.location.hash != '' ) {
		       		setTimeout(()=>{
		       			this.clickListGroup(document.location.hash,true) ; 
		       		},1500)		       		
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
  			
  			// console.info("obj",obj) ; 
  			return obj ; 
  		
  		} ,

  		/**
	    * Animate anchor to a bloc
	    * @param (string) bloc name by id
	    * @param (boolean) force scrolling animation
	    * @return (no return)
	    */
	    clickListGroup : function( bloc , scroll ){
	      	bloc = bloc.replace('#','') ; 
	      	this.manageClassList(bloc) ; 
	    	
	      	if (scroll==true){
	      		$("html, body").animate({ scrollTop: $(`#${bloc}`).offset().top }, 0 );
	      	}
	    },
	    /**
	    * Set button class
	    * @param (string) bloc name by id
	    * @return (no return)
	    */
	    manageClassList : function( bloc ){
	      
	      $('.list-group li.list-group-item').removeClass('active') ; 
	      $(`a[href="#${bloc}"]`).parent().addClass('active') ; 

	      this.$router.push({ hash : `#${bloc}` }) ; 

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

	.list-group#left-nav{
		&.fixed{
			position: fixed ; 
			top: 0;
			max-width: 300px;
		}

		li{
			cursor: pointer;
			a{
				text-decoration: none;
				display: block;
				width: 100% ;
			}
			&.active{
			    background: #0d3453 ;
			    border-color: #0d3453 ;
			    a{
			    	color: #fff ;
			      	&:hover{
			        	text-decoration: none;
			      	}
				}
			}
			&:hover{
				background: #ccc ;
				a{
					color: #0d3453 ; 
				}
			}
			&.sub{
				padding-left: 40px;
			}
		}
	}

	.col{
		.card{

			.card-body{
				min-height: 600px;
			}

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
