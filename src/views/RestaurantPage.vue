<template>
    <div>
            <!-- <h3>RestaurantId: {{$route.params.id}}</h3> -->
            <!-- Restaurant Info -->
            <RestaurantInfo 
                :id=restaurantInfo[0].id
                :naziv=restaurantInfo[0].naziv
                :adresa=restaurantInfo[0].adresa
                :radnoVrijeme=restaurantInfo[0].radnoVrijeme
                :kontaktBroj=restaurantInfo[0].kontaktBroj
                :datumStvaranja=restaurantInfo[0].datumStvaranja
                :potvrden=restaurantInfo[0].potvrden
                :vlasnik=restaurantInfo[0].vlasnik
                :vrsta=restaurantInfo[0].vrsta
                :grad=restaurantInfo[0].grad
                :fotografije=restaurantInfo[0].fotografije
                :pogodnosti=restaurantInfo[0].pogodnosti
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
                <div v-if="this.$store.getters.getUser.uloga == 'ugostitelj' && this.$store.getters.getUser.id == restaurantInfo[0].vlasnik" id="edit">
                <EditObjectForm  
                    :ime=restaurantInfo[0].naziv
                    :adresa=restaurantInfo[0].adresa
                    :telefon=restaurantInfo[0].kontaktBroj
                    :workingHours=restaurantInfo[0].radnoVrijeme
                    :pogodnosti=restaurantInfo[0].pogodnosti
                    :kratica=restaurantInfo[0].vrsta
                    :id=restaurantInfo[0].id
                    :grad=restaurantInfo[0].grad
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
            const res = await fetch('http://localhost:3000/restaurant/' + this.$route.params.id);
            const data = await res.json();
            console.log(data)
            return data;
        },
    },
    async created(){
        this.restaurantInfo = await this.fetchRestaurant();
    },
    data(){
        return {
            restaurantInfo: [{
            }],
            restaurantReviews: [],
        }
    },
    
}
</script>


<style scoped>

</style>