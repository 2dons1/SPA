<template>
    <div>

        <!-- Filteri -->
        <div data-test="filteri" class="filters">
            <div class="search">
                <input type="text" v-model="input" placeholder="Pretraži objekte prema imenu ili vrsti..." />
            </div>

            <!-- Probaj ovaj dropdown stavit da bude kao nastavak search bara-->
            <div class="dropdown">
                <form @submit.prevent="handleSubmit">
                    <label>Odaberi grad: </label>
                    <select name="cities" id="cities" v-model="selected" class="custom-select" style="width:75px;">
                        <option value="all">Svi</option>
                        <option v-bind:key="city" v-for="city in cities" :value="city">{{ city }}</option>
                    </select>
                    <br><br>
                    <button>Filtriraj</button>
                </form>
            </div>
        </div>
        
        <!-- Kartice -->
        <div class="cards"> 
            <div v-bind:key="restaurant.sid" v-for="restaurant in filteredRestaurants">
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

            <div class="item error" v-if="input&&!filteredRestaurants.length">
                <p>Nema rezultata!</p>
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
        async fetchRestaurants(city){

            const getOptions = {
                method: "GET",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer ' + localStorage.getItem('token') // Ovo mi ne treba, anonimi korisnik isto moze pogledat ovo.
                },
            }

            //DONS: const res = await fetch('http://localhost:3001/restaurants?' + new URLSearchParams({grad: city}), getOptions);
            const res = await fetch('http://localhost:3000/objects?' + new URLSearchParams({'city': city}), getOptions);
            const data = await res.json();
            return data;
        },
        async handleSubmit(){
            console.log("Submito si: " + this.selected);
            
            // Ako je odabran 'all' samo refreshaj stranicu.
            if(this.selected == 'all'){
                this.restaurants = await this.fetchRestaurants('');
            }
            // Inače saljem novi zahtijev ili cu filtrirat postojece???
            else{
                this.restaurants = await this.fetchRestaurants(this.selected);
            }
            
        }
    },
    data(){
        return {
            restaurants: [],
            cities: [],
            input: '',
            selected: 'all',
        }
    },
    computed: {
        filteredRestaurants() {
            return this.restaurants.filter(restaurant => {
                return restaurant.naziv.toLowerCase().indexOf(this.input.toLowerCase()) != -1 || restaurant.vrsta.toLowerCase().indexOf(this.input.toLowerCase()) != -1;
            });
        }
    },
    async created(){
        this.restaurants = await this.fetchRestaurants('');
        this.restaurants.forEach(restaurant => {
            if(!this.cities.includes(restaurant.grad)){
                this.cities.push(restaurant.grad)
            }
        });
    },
}
</script>


<style scoped>
    /*TODO: popravi malo dizajn. Kada ima manje od 4 objekta izgleda kinda scuffed. */
    .cards {
        max-width: 2000px;
        margin-right: 20px;
        display: grid;
        grid-gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }

    /* HUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUH */
    .search > input{
        display: block;
        width: 350px;
        margin: 20px auto;
        padding: 10px 100px 10px 10px;
        background: white;
        background-size: 15px 15px;
        font-size: 16px;
        border: none;
        border-radius: 5px;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    }

    button{
        background: #006B86;
        border: 0;
        padding: 10px 20px;
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