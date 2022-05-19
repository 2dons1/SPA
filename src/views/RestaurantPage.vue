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
                <div v-if="this.$store.getters.getUser.uloga == 'ugostitelj' && this.$store.getters.getUser.id == 'restaurantInfo.vlasnik'" id="edit">
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
        async fetchRestaurant(){
            //DONS: const res = await fetch('http://localhost:3000/restaurant/' + this.$route.params.id);
            const res = await fetch('http://localhost:3000/objects/' + this.$route.params.id);
            const data = await res.json();
            return data;
        },
    },
    async created(){
        this.restaurantInfo = await this.fetchRestaurant();
    },
    data(){
        return {
            restaurantInfo: {},
            restaurantReviews: [],
        }
    },
    
}
</script>


<style scoped>

</style>