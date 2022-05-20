<template>
    <div>
            <!-- <h3>RestaurantId: {{$route.params.id}}</h3> -->
            <!-- Restaurant Info -->
            <!-- Treba mi vlasnik objekta ovdje-->
            <RestaurantInfo 
                :id=restaurantInfo.sid
                :naziv=restaurantInfo.naziv
                :adresa=restaurantInfo.adresa
                :radnoVrijeme=restaurantInfo.radnoVrijeme
                :kontaktBroj=restaurantInfo.kontaktBroj
                :datumStvaranja=restaurantInfo.datumStvaranja
                :potvrden=restaurantInfo.potvrden
                :vrsta=restaurantInfo.vrsta
                :grad=restaurantInfo.grad
                :fotografije=restaurantInfo.fotografije
                :pogodnosti=restaurantInfo.pogodnosti
                :vlasnik=restaurantInfo.vlasnik
            />
            
            <!-- Restaurant Reviews -->
            <Reviews
                :id=this.$route.params.id
            />

            <!-- Leave a review form: treba mi id od ugostiteljskog objekta, id od usera koji ostavlja review i tekst review-a -->
            <!-- Prikazi ovu komponentu samo ako je korisnik gost, mozda i ako je ugostitelj ali nije vlasnik ovog objekta-->
            <div v-if="this.$store.getters.getUser">
                <ReviewForm
                    :id=this.$route.params.id
                v-if="this.$store.getters.getUser.uloga == 'gost'"/>

                <!-- Ako je korisnik ugostitelj i ujedno tome i vlasnik ovog objekta onda stavi formu za ažuriranje podataka -->
                <div v-if="this.$store.getters.getUser.uloga == 'ugostitelj' && this.$store.getters.getUser.username == restaurantInfo.vlasnik" id="edit">
                <EditObjectForm  
                    :ime=restaurantInfo.naziv
                    :adresa=restaurantInfo.adresa
                    :telefon=restaurantInfo.kontaktBroj
                    :workingHours=restaurantInfo.radnoVrijeme
                    :pogodnosti=restaurantInfo.pogodnosti
                    :kratica=restaurantInfo.vrsta
                    :id=restaurantInfo.sid
                    :grad=restaurantInfo.grad
                />
                </div>
            </div>

            <div class="pagination">
                <router-link :to="'/objects/' + this.prethodni" class="router">Prethodni</router-link>
                <router-link :to="'/objects/' + this.sljedeci" class="router">Sljedeci</router-link>
            </div>

    </div>
</template>



<script>
import RestaurantInfo from '../components/RestaurantInfo.vue'
import Reviews from '../components/Reviews'
import ReviewForm from '../components/ReviewForm.vue'
import EditObjectForm from '../components/EditObjectForm.vue'

export default{
    
    name: 'RestaurantPage',
    props: {
    },
    components:{
        RestaurantInfo,
        Reviews,
        ReviewForm,
        EditObjectForm,
    },
    methods:{
        before(){
            console.log('/objects/' + this.prethodni);
            
        },
        after(){
            console.log('/objects/' + this.sljedeci);
            this.$router.push({ name: '', params: { id: this.sljedeci } })
        },
        async fetchRestaurants(city){

            const getOptions = {
                method: "GET",
                headers: { 
                    "Content-Type": "application/json",
                },
            }

            const res = await fetch('http://localhost:3000/objects?' + new URLSearchParams({'city': city}), getOptions);
            const data = await res.json();
            return data;
        },
        async fetchRestaurant(){
            //DONS: const res = await fetch('http://localhost:3000/restaurant/' + this.$route.params.id);
            const res = await fetch('http://localhost:3000/objects/' + this.$route.params.id);
            const data = await res.json();
            return data;
        },
    },
    async created(){
        this.restaurantInfo = await this.fetchRestaurant();
        this.restaurants = await this.fetchRestaurants('');
        this.restaurants.forEach(restaurant => {
            if(!this.sids.includes(restaurant.sid)){
                this.sids.push(restaurant.sid)
            }
        });
        if(this.sids.indexOf(this.$route.params.id) == 0){
            this.prethodni=this.sids[this.sids.length - 1];
            this.sljedeci=this.sids[1];
        }
        else if(this.sids.indexOf(this.$route.params.id) == this.sids.length - 1){
            this.sljedeci=this.sids[0];
            this.prethodni=this.sids[this.sids.length - 2];
        }
        else{
            this.sljedeci=this.sids[this.sids.indexOf(this.$route.params.id) + 1];
            this.prethodni=this.sids[this.sids.indexOf(this.$route.params.id) - 1];
        }

    },
    data(){
        return {
            restaurantInfo: {},
            restaurants: [],
            restaurantReviews: [],
            sids: [],
            prethodni: '',
            sljedeci: ''
        }
    },
}
</script>


<style scoped>
.router{
    margin-right: 10px;
    text-decoration: none;
}

.pagination{
    position: fixed;
    bottom: 0%;
    left: 0%;
}
</style>