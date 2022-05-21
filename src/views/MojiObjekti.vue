<!-- Ovaj view sluzi kao prikaz svih objekata određenog ugostitelja tj. kao njegova kontrolna ploča. -->
<template>
    <div>
        <div data-test="dodaj" class="buttons">
                <a href="#add-new">
                    <button class="btn">Dodaj novi objekt</button>
                </a>
        </div>
        
        <div data-test="kartice" class="cards"> 
            <div v-bind:key="restaurant.naziv" v-for="restaurant in restaurants">
                <RestaurantCard class="card" 
                    :id=restaurant.sid
                    :naziv=restaurant.naziv
                    :adresa=restaurant.adresa
                    :radnoVrijeme=restaurant.radnoVrijeme
                    :kontaktBroj=restaurant.kontaktBroj
                    :datumStvaranja=restaurant.datumStvaranja
                    :potvrden=restaurant.potvrden
                    :vrsta=restaurant.vrsta
                    :grad=restaurant.grad
                    :fotografije=restaurant.fotografije
                    :pogodnosti=restaurant.pogodnosti
                />
            </div>
        </div>

        <div data-test="forma" id="add-new">
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
            const getOptions = {
                    method: "GET",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": 'Bearer ' + localStorage.getItem('token').slice(1, -1)
                    }
            };
            const res = await fetch('http://localhost:3000/users/' + this.$store.getters.getUser.username + '/objects', getOptions);
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