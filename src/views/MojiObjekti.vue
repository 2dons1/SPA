<!-- Ovaj view sluzi kao prikaz svih objekata određenog ugostitelja tj. kao njegova kontrolna ploča. -->
<template>
    <div>

        <div class="master-detail">

            <div class="master">
                <table id="customers">
                    <tr>
                        <th>Moji objekti</th>
                    </tr>
                    <tr v-bind:key="restaurant" v-for="restaurant in restaurants">
                        <td @click="changeDetail(restaurant)" >{{restaurant.naziv}}</td>
                    </tr>
                </table>
            </div>

            <div v-if="currentRestaurant" class="detail">
                <RestaurantCard class="restaurant"
                    :id=currentRestaurant.sid
                    :naziv=currentRestaurant.naziv
                    :adresa=currentRestaurant.adresa
                    :radnoVrijeme=currentRestaurant.radnoVrijeme
                    :kontaktBroj=currentRestaurant.kontaktBroj
                    :datumStvaranja=currentRestaurant.datumStvaranja
                    :potvrden=currentRestaurant.potvrden
                    :vrsta=currentRestaurant.vrsta
                    :grad=currentRestaurant.grad
                    :fotografije=currentRestaurant.fotografije
                    :pogodnosti=currentRestaurant.pogodnosti
                />
            </div>
        </div>

        <!-- 
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
        -->

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
        changeDetail(restaurant){
            this.currentRestaurant = restaurant;
        }
    },
    data(){
        return {
            restaurants: [],
            currentRestaurant: null,
        }
    },
    async created(){
        this.restaurants = await this.fetchRestaurants();
        this.currentRestaurant = this.restaurants[0]
    }
}
</script>


<style scoped>
.restaurant{
    margin: auto;
}

.detail{
    margin-top: 10px;
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

#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 50%;
  margin: auto;
}

#customers td, #customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even){background-color: #f2f2f2;}

#customers tr:hover {background-color: #ddd;}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #006B86;
  color: white;
}
</style>