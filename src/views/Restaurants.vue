<template>
    <div>
        <div>
            <h3>Search Bar goes here</h3>
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
    </div>
</template>



<script>
import RestaurantCard from '../components/RestaurantCard'

export default{
    name: 'Restaurants',
    props: {
    },
    components:{
        RestaurantCard
    },
    methods:{
        async fetchRestaurants(){
            const res = await fetch('http://localhost:3000/restaurants');
            const data = await res.json();
            // console.log(data);
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
</style>