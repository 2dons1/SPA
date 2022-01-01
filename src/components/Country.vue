<template>
  <div class="flip-card">
   <div class="flip-card-inner">

    <div class="flip-card-front">
      <img :src="imgLink" alt="flag" style="width:300px;height:150px;">
    </div>

    <div class="flip-card-back">
      <h3 v-bind:class="checkPopulation" >{{title}}</h3> <!--If a country has more then 1.000.000 population, title will be red.-->
      <p>{{capital}}</p>
      <p>{{population}}</p>
    </div>

  </div>
</div>
</template>



<script>
export default {
        name: 'Country',
        props: {
            title: String,
            capital: String,
            population: Number,
            imgLink: String,
        },
        computed: {
          checkPopulation: function(){
            return {
              bigCountry: this.population >= 1000000
            }
          }
        }
    }
</script>



<style scoped>
body {
  font-family: Arial, Helvetica, sans-serif;
}

.flip-card {
  background-color: transparent;
  width: 300px;
  height: 150px;
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.flip-card-front {
  background-color: #bbb;
  color: black;
}

.flip-card-back {
  background-color: #006B86;
  color: white;
  transform: rotateY(180deg);
}

.bigCountry{
  color: red;
}
</style>