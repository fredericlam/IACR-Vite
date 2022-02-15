<template>
		
	<!--<canvas id="map"></canvas>-->
	<div class="row">
		<div :class="{ 'col-md-9': (hide_selector==false) , 'col' : (hide_selector==true) }">
			<div class="card">
	    		<div class="card-body">
	    			<h2 class="card-title" v-if="registry_target.label">{{ registry_target.label }} <span class="badge bg-info text-dark coordinates">[{{ registry_target.geo.lat }},{{ registry_target.geo.lng }}]</span></h2>
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
		</div>

	</div>
	
</template>

<script>
import { reactive,computed,onMounted } from "vue";
import axios from 'axios'
import { useStore } from 'vuex' ;
import { CarbonIconsVue } from '@carbon/icons-vue';
import Http from '@carbon/icons-vue/es/http/16';
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
	},
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

    		registries : [] , 
    		points : [] ,

    		promises : [] , 

    		// values
    		registry_target : {} , 
    		select_registry : 25000800
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
					.clipAngle(90)
					//.fitExtent([[10, 10], [this.width - 10, this.eight - 10]], this.sphere)
				;

				this.projection__ = d3.geoMercator()
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

    			this.svg.append("path")
				  .datum({type: "Sphere"})
				  .attr("class", "water")
				  .attr("d", this.path);

			 	this.g = this.svg.append('g').attr('class','group_countries') ; 

    			//console.table(this.countries); 
    			//return ;

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

			    this.registries.map((r)=>{

		    		if ( r.geo != undefined ) this.points.push(r) ; 

		    		let geo = { lat : 0 , lng : 0 } ; 
		    		r.geo = ( r.geo == undefined ) ? geo : r.geo ; 

		    		return r; 
		    	})
    			
    			this.svg_circles = this.svg.append('g').attr('class','group_circle') ; 
		    	
		    	this.svg_circles
                    .selectAll('circle.reg')
                    .data( this.points )
                    .enter()
                    .append('circle')
                    .attr('class','reg')
                    .attr('id',(d)=>`circle-${d.country}`)
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
                    .attr("stroke","#cccccc")
                    .transition()
                    .duration(1250)
                    .delay((_, i)=>{ return i * 50; })
                    .attr("r", 5)

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

  			this.registry_target = this.registries.find(r=>r.country==this.select_registry) ; 

  			// this.coordinates = `<span class="badge bg-info text-dark">[${registry_target.geo.lat.toFixed(2)},${registry_target.geo.lng.toFixed(2)}]</span>`;

  			// console.info("=>",this.registry_target) ; 
  			
  			if (this.registry_target.geo == undefined ) {
  				console.warn(`No geo loc found for ${this.registry_target.geo}`)
  				return ; 
  			}

  			let points = this.registry_target.geo ; 
  			var rotate = this.projection.rotate() ; 

  			// console.info("rotate",rotate) ; 

  			(function transition() {
		      d3.transition()
		      	.duration(2500)
		      	.tween("rotate", () => {
			        var r = d3.interpolate( this.projection.rotate(), [-points[0], -points[1]]);
			        return (t) => {
			          	this.projection.rotate(r(t));
			          	//this.svg.selectAll("path").attr("d", this.path)
			          	//.classed("focused", function(d, i) { return d.id == focusedCountry.id ? focused = d : false; });
			        };
		      })

	      	})();

  		} , 

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

		path.country:hover {
		  	fill:#33CC33;
		  	stroke-width: 1px;
		}

		path.focused {
		  	fill: #33CC33;
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