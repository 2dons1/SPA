<template>
    <article class="card">
      <img :src="require(`@/assets/${image}`)" alt="exposed brick wall in a hipster cafe">
      <h3>{{naziv}} </h3> 
      <i  v-if="kratica === 'caffe'" class='fas fa-cocktail'></i>
      <i  v-else class="fas fa-hamburger"></i>
      <p><strong>Adresa:</strong> {{adresa}}</p>
      <p><strong>Radno vrijeme:</strong> {{radnoVrijeme}}</p>
      <p><strong>Telefon:</strong> {{telefon}}</p>
      <router-link :to="'/restaurants/' + id" class="router">Detalji</router-link>
    </article>
</template>



<script>
export default {
        name: 'RestaurantCard',
        props: {
            naziv: String,
            image: String,
            kratica: String, 
            radnoVrijeme: String,
            adresa: String,
            id: Number,
            telefon: String
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