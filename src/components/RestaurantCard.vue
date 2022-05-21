<template>
    <article class="card">
      <img :src="require(`@/assets/placeholder.png`)" alt="exposed brick wall in a hipster cafe"> <!-- ${image} -->
      <h3>{{naziv}} </h3> 
      
      <i  v-if="vrsta === 'caffe'" class='fas fa-coffee'></i>
      <i  v-else-if="vrsta === 'restoran'" class='fas fa-utensils'></i>
      <i  v-else-if="vrsta === 'bistro'" class='fas fa-hamburger'></i>
      <i  v-else-if="vrsta === 'noćni klub'" class='fas fa-cocktail'></i>
      <i  v-else-if="vrsta === 'bar'" class='fas fa-beer'></i>

      <p><strong>Grad:</strong> {{grad}}</p> 
      <p><strong>Adresa:</strong> {{adresa}}</p>
      <p><strong>Radno vrijeme:</strong> {{radnoVrijeme}}</p>
      <p><strong>Telefon:</strong> {{kontaktBroj}}</p>
      
      <router-link :to="'/objects/' + id" class="router">Detalji</router-link>
      
    </article>
</template>



<script>
export default {
        name: 'RestaurantCard',
        props: {
            id: String,
            naziv: String,
            adresa: String,
            radnoVrijeme: String,
            kontaktBroj: String,
            datumStvaranja: String,
            potvrden: Boolean,
            // vlasnik: Number, // vlasnik mi ne treba
            vrsta: String,
            grad: String,
            fotografije: Array,
            pogodnosti: Array,
            sids: Array
        },
        
    }
</script>



<style scoped>
* {
  margin: 0px;
  padding: 0px;
}

.card {
  width: 320px;
  padding: 20px;
  margin: 10px;
  border: 1px solid #d7d7d7;
  border-radius: 2px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.15);
  background-color: white;
}

.card > img {
  border-radius: 2px;
  max-width: 100%;
  margin-bottom: 10px;
  height: auto;
}

.card p {
  color: #757575;
  line-height: 1.5;
  padding-top: 10px;
}

.router{
  text-decoration: none;
  color: #006B86;
}

.router:hover{
  color: #033a47;
}


</style>