<!-- Ovaj view sluzi kao prikaz svih objekata određenog ugostitelja tj. kao njegova kontrolna ploča. -->
<template>
    <div>
        <div class="buttons">
                <a href="#add-new">
                    <button class="btn">Dodaj novi objekt</button>
                </a>
        </div>
        
        <div class="cards"> 
            <div v-bind:key="restaurant.naziv" v-for="restaurant in restaurants">
                <RestaurantCard class="card" 
                    :naziv=restaurant.naziv
                    :image=restaurant.image
                    :kratica=restaurant.kratica
                    :radnoVrijeme=restaurant.radnoVrijeme
                    :adresa=restaurant.adresa
                    :telefon=restaurant.telefon
                    :id=restaurant.id
                />
            </div>
        </div>

        <div id="add-new">
            <AddObjectForm />
        </div>

    </div>
</template>



<script>
import RestaurantCard from '../components/RestaurantCard'
import AddObjectForm from '../components/AddObjectForm.vue'

export default{
    name: 'MojiObjekti',
    props: {
    },
    components:{
        RestaurantCard,
        AddObjectForm
    },
    methods:{
        async fetchRestaurants(){
            const res = await fetch('http://localhost:3000/restaurants'); // Ovo treba promjeniti na neki drugi resurs koji ce vratiti objekte samo za tog ugostitelja.
            const data = await res.json();
            return data;
        },
    },
    data(){
        return {
            restaurants: []
        }
    },
    async created(){
        this.restaurants = await this.fetchRestaurants();
    }
}
</script>


<style scoped>
.cards {
    max-width: 2000px;
    margin-right: 20px;
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.buttons{
    text-align: center;
}

button{
    background: #006B86;
    border: 0;
    padding: 10px 20px;
    margin-top: 20px;
    color: white;
    border-radius: 5px;
}

button:hover{
    background: #003c4b;
}

button:active{
    transform: translateY(4px);
}
</style>