<template>
		
	<!--<canvas id="map"></canvas>-->
	<div class="row">
		<div :class="{ 'col-md-9': (hide_selector==false) , 'col' : (hide_selector==true) }">
			<div class="card">
	    		<div class="card-body">
	    			<h2 class="card-title" v-if="registry_target.label">{{ registry_target.label }} 
	    				<span class="badge bg-info text-dark coordinates" v-if="not_found==false">[{{ registry_target.geo.lat }},{{ registry_target.geo.lng }}]</span></h2>
	    			<p class="card-text">
						<div id="container-map"></div>
					</p>
				</div>
			</div>
		</div>
		<div class="col-md-3" v-if="hide_selector==false">
			<div class="card">
	    		<div class="card-body">
	    			<h2 class="card-title">Pick a registry</h2>
	    			<p class="card-text">
						<form name="form-select" action="" method="GET">
							
							<!--<select name="registy">
								<optgroup v-for="registry_g in registries" :label="registry_g.key">
									<option v-for="registry in registry_g.val" :value="registry.reg_link">
										{{ registry.name }} ({{ registry.country }})
									</option>
								</optgroup>
							</select>-->

							<select name="registy" v-model="select_registry" v-on:change="findRegistry">
								<option v-for="registry in registries" :value="registry.country">
									{{ registry.label }} ({{ registry.area_label }})
								</option>
							</select>
						</form>
					</p>
				</div>
			</div>
			<br/>
			<div class="card">
	    		<div class="card-body">
	    			<p class="card-text">
	    				<ul class="list-group" id="registry-info" v-if="not_found==false">
						  <li class="list-group-item">
						  	<Http aria-label="Link to report"/><a :href="registry_target.url" target="_blank">See details</a>
						  </li>
						  <li class="list-group-item">
						  	<Word aria-label="Download report"/><a :href="registry_target.report" target="_blank">Download report</a>
						  </li>
						  <li class="list-group-item"><Flag/>{{ registry_target.grouping }}</li>
						  <li class="list-group-item"><Location/>{{ registry_target.area_label }}</li>
						</ul>
						<div class="alert alert-danger text-center" role="alert" v-if="not_found==true">
							Localisation for {{ registry_target.label }} has not been set
						</div>
	    			</p>
	    		</div>
	    	</div>

		</div>

	</div>
	
</template>

<script>
import { reactive,computed,onMounted } from "vue";
import axios from 'axios'
import { useStore } from 'vuex' ;
import { CarbonIconsVue } from '@carbon/icons-vue';
import Http from '@carbon/icons-vue/es/http/16';
import Word from '@carbon/icons-vue/es/document--word-processor/16'; 
import Flag from '@carbon/icons-vue/es/flag--filled/16'; 
import Location from '@carbon/icons-vue/es/location--company--filled/16'; 

import Available from '../components/Available.vue' ;
import Func from '../func.js' ;

// source: http://bl.ocks.org/KoGor/5994804

export default {
	name : 'RegistriesMap' , 
	props: {
		width : { type: Number, default: 800 }, 
		height : { type: Number, default: 800 },
		scale : { type: Number, default: 380 },
		hide_selector : { type: Boolean , default: false },
		select_registry : { type : Number , default : 25000800 }
	},
	components : { Available , Http , Word , Flag , Location } , 
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

    		path_medias : `http://gcodev.nanga.iarc.lan/media/iacr/report/`,
    		
    		world 	: {} , 
    		land 	: {} ,
    		borders : [] , 
    		countries : [] , 
    		sphere : {} , 

    		//width : 800 , 
    		//height : 800 , 
    		direction : 0.25 ,
    		focused : {} , 
    		name : '' , 

    		svg : {} , 
    		canvas : {} , 
    		projection : {} , 
    		context : {} , 
    		path : {}, 
    		tooltip : {} ,

    		registries : [] , 
    		points : [] ,

    		promises : [] , 

    		// values
    		registry_target : {} , 

    		not_found : false 
    		// select_registry : 25000800
    	}
	},
	created(){	
		//console.info("B created") ;
	},
	mounted(){
		//console.info("D mounted") ;

		this.promises = this.promises.concat(
			axios.get( "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json" ) ,
			axios.get( '/data/registries.json' ) , 
			axios.get( '/data/world-cities.json' ) 
		); 

		axios.all( this.promises )
			.then( axios.spread(( world_promise , registries_promise , cities_promise ) => {

				// console.log( world_promise , registries_promise , cities_promise ) ; 

				this.world 		= world_promise.data ; 
				this.land 		= topojson.feature(this.world, this.world.objects.land)
				this.borders 	= topojson.mesh(this.world, this.world.objects.countries, (a, b) => a !== b)
				this.countries 	= topojson.feature(this.world, this.world.objects.countries).features

				// this.height = t//Math.min(this.width, 720)
				this.sphere = ({type: "Sphere"})

				this.projection = d3.geoOrthographic()
					.scale(this.scale)
					.rotate([0, 0])
					.translate([ this.width / 2, this.height / 2])
					// .clipAngle(90)
					.clipAngle(100 + 1e-6)
					.precision(.3) 
					//.fitExtent([[10, 10], [this.width - 10, this.eight - 10]], this.sphere)
				;

				this.projection__ = d3.geoNaturalEarth1()
				    .center([0, 5 ])
				    .scale(150)
				    .rotate([-180,0]);

				//this.path = d3.geoPath(this.projection, this.context);
				this.path = d3.geoPath(this.projection);

				//this.canvas = document.getElementById('map');
				//this.context = this.canvas.getContext('2d');
				//const context = DOM.context2d(this.width, this.height);

				this.svg = d3.select('#container-map').append('svg')
					.attr('id','map')
    				.attr("width", this.width)
    				.attr("height", this.height) ;

    			this.tooltip = d3.select('#container-map') 
		          	.append('div')
		          	.attr('id','map-tooltip')                             
		          	.attr('class', 'd3-tooltip'); 

    			this.svg.append("path")
				  .datum({type: "Sphere"})
				  .attr("class", "water")
				  .attr("d", this.path);

			 	this.g = this.svg.append('g').attr('class','group_countries') ; 

    			this.g.selectAll("path")
			       	.data(this.countries)
			       	.enter().append("path")
			       	.attr('class','country')
			       	.attr("d", this.path )
			       	.call(d3.drag()
				      //.origin(()=>{ var r = this.projection.rotate(); return {x: r[0] / sens, y: -r[1] / sens}; })
				      .on("drag", () =>{
				        var rotate = this.projection.rotate();
				        this.projection.rotate([event.x * this.direction, -event.y * this.direction, rotate[2]]);
				        this.svg.selectAll("path.land").attr("d", this.path);
				        this.svg.selectAll(".focused").classed("focused", this.focused = false);
			      	}))

			    this.registries = registries_promise.data ;

			    // console.info(this.countries,this.registries); 
    			//return ;

			    // find centroid for each registry
			    // 3 cases
			    // - coordinates are mentionned into json
			    // - coordinates are deduced from cities
			    // - coordinates are set from centroid 

			    this.registries.map((r)=>{

		    		if ( r.geo != undefined ){
		    			this.points.push({
			  				id  : r.country , 
			  				label : r.label ,
			  				geo : { lat : r.geo.lat , lng : r.geo.lng },
			  				tooltip : [{ label : 'X' , value : 'Y' }]
			  			})
		    		}
		    		else { //if ( r.geo == undefined ){

		    			// get centroid of country 
		    			let country = this.countries.find(c=>c.properties.name==r.grouping);
		    			if ( country != undefined ){
		    				let geo = d3.geoCentroid( country ) ;

		    				//console.info("geo",r.grouping,geo);
		    				this.points.push({
				  				id  : r.country , 
				  				label : r.label ,
				  				geo : { lat : geo[1] , lng : geo[0] },
				  				tooltip : [{ label : 'X' , value : 'Y' }]
				  			})
				  			r.geo = { lat : geo[1] , lng : geo[0] } ; 
		    			}
		    		}

		    		// let geo = { lat : 0 , lng : 0 } ; 
		    		return r; 
		    	})
    			
    			this.svg_circles = this.svg.append('g').attr('class','group_circle') ; 
		    	
		    	this.svg_circles
                    .selectAll('circle.registry')
                    .data( this.points )
                    .enter()
                    .append('circle')
                    .attr('class','registry')
                    .attr('label',d=>d.label)
                    .attr('id',(d)=>`circle-${d.id}`)
                    .attr("r", 0)
                    .attr("cx", (d)=>{
                        if ( d.geo != undefined )
                        {
                            return this.projection([d.geo.lng,d.geo.lat])[0] 
                        }
                    })
                    .attr("cy", (d)=>{
                        if ( d.geo != undefined )
                        {
                            return this.projection([d.geo.lng,d.geo.lat])[1] 
                        }
                    })
                    .attr("fill","#33CC33")
                    .attr("fill-opacity",1)
                    .attr("stroke","#cccccc")
                    .attr("stroke-width","0.6px")
                    .transition()
                    .duration(1250)
                    //.delay((_, i)=>{ return i * 50; })
                    .attr("r", 5)
                
                this.svg_circles
                	.selectAll('circle.registry')
                    .on("mousemove",(event,d)=>{
                    	// console.info(event,d) ; 

                    	// this.tooltip.html(" ")
                    	this.tooltip.style('display','block');

                    	let default_tooltip_content = `
                    		<h5>${d.label}</h5>
                    		<table>
                    			<tr>
                    				<td class="metric"></td>
                    				<td class="value"></td>
                    			</tr>
                    		</table>` ; 
                
                		this.tooltip.html( default_tooltip_content );

                		let mouse = d3.pointer( event );

		                let mouse_y = mouse[1] , mouse_x = mouse[0] - 35 ; 

		                this.tooltip
		                	.style('top', `${mouse_y}px`)
                    		.style('left', `${mouse_x}px`)
                    })
                    .on("mouseout",(event,d)=>{
                    	this.tooltip.style('display','none');
                    });

                    this.findRegistry();

			}))
            // eslint-disable-next-line
            .catch( error => {
                console.error("Error catched",error) ; 
                this.error = true
            })
            .finally(() => {
            })

	},
	unmounted() {
  	}, 

  	methods : {

  		findRegistry : function(){

  			this.not_found = false ; 
  			
  			// this.$router.push({ hash : '#main-nav' }) ; 
  			$("html, body").animate({ scrollTop: $( '#main-nav' ).offset().top }, 0 );

  			this.registry_target = this.registries.find(r=>r.country==this.select_registry) ; 

  			this.registry_target.url = `/registries/${Func.slugify(this.registry_target.label)}/${this.
  				registry_target.country}/` ; 

  			this.registry_target.report = `${this.path_medias}${this.select_registry}/report.docx` ; 


  			// this.coordinates = `<span class="badge bg-info text-dark">[${registry_target.geo.lat.toFixed(2)},${registry_target.geo.lng.toFixed(2)}]</span>`;

  			// console.info(" In map =>",this.registry_target) ; 
  			
  			if (this.registry_target.geo == undefined ) {
  				console.warn(`No geo loc found for ${this.registry_target.geo}`)
  				this.not_found = true ; 

  				return ; 
  			}

  			let points = this.registry_target.geo ; 
  			var rotate = this.projection.rotate() ; 

  			let transition_duration = 2500 ; 
  			// start rotating 
	      	d3.transition()
	      		.duration( transition_duration )
	      		.tween("rotate", () => {
			        var r = d3.interpolate( this.projection.rotate(), [-points.lng, -points.lat]);
			        
			        return (t) => {
			        	// console.info(t) ; 
			          	this.projection.rotate(r(t));

			          	// rotate path/land/countries
			          	this.svg.selectAll("path")
			          		.attr("d", this.path)
			          	
			          	// rotate circle/points.registris
			          	this.svg_circles.selectAll('circle.registry')
			          		.attr("cx", (d)=>this.projection([d.geo.lng,d.geo.lat])[0])
            				.attr("cy", (d)=>this.projection([d.geo.lng,d.geo.lat])[1])

			          	//.classed("focused", function(d, i) { return d.id == focusedCountry.id ? focused = d : false; });
			        };
			  	});

	      		// after 
			  	setTimeout(() => {

			  		this.svg_circles.selectAll('circle.registry')
			  			.transition()
                    	.duration(1250)
			  			.attr("r",d=>{
			  				return (d.id==this.registry_target.country)?5:0.5;
			  			})

			  		$(`circle#circle-25000800`).trigger('mousemove') ; 

			  	}, transition_duration )

  		} // end findRegistry

  	}
  
}


</script>

<style lang="scss">

#container-map{

	svg#map{
		display: block ; 
		margin: auto ; 

		path.water {
		  	fill: #0d3453;
		}

		path.country {
		  	fill: #A98B6F;
      		stroke: #000;
			stroke-width: 0.1px;
		}

		circle{
			display: block ; 
		}

		/*path.country:hover {
		  	fill:#33CC33;
		  	stroke-width: 1px;
		}
		path.focused {
		  	fill: #33CC33;
		}*/
	}
}

#registry-info{
	li{
		svg{
			position: absolute;
			right: 10px;
		}
		a{
			text-decoration: underline;
			padding-left: 0;
			margin-left: 0;
		}
	}
}

.coordinates{
	font-size: 0.4em;
}

form{
	select{
		width:100%;
	}
}

</style>