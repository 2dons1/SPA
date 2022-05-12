<template>
    <div>
            <!-- <h3>RestaurantId: {{$route.params.id}}</h3> -->
            <!-- Restaurant Info -->
            <RestaurantInfo 
                :name=restaurantInfo[0].naziv
                :address=restaurantInfo[0].adresa
                :phone=restaurantInfo[0].telefon
                :time=restaurantInfo[0].time
                :workingHours=workingHours
                :pogodnosti=pogodnosti
                :id=this.$route.params.id
            />
            
            <!-- Restaurant Reviews -->
            <Reviews 
                :id=this.$route.params.id
            />

            <!-- Leave a review form: treba mi id od ugostiteljskog objekta, id od usera koji ostavlja review i tekst review-a -->
            <!-- Prikazi ovu komponentu samo ako je korisnik gost, mozda i ako je ugostitelj ali nije vlasnik ovog objekta-->
            <ReviewForm
                :id=this.$route.params.id
            v-if="0"/>

            <!-- Ako je korisnik ugostitelj i ujedno tome i vlasnik ovog objekta onda stavi formu za ažuriranje podataka -->
            <div v-else id="edit">
            <EditObjectForm  
                :ime=restaurantInfo[0].naziv
                :adresa=restaurantInfo[0].adresa
                :telefon=restaurantInfo[0].telefon
                :workingHours=workingHours
                :pogodnosti=pogodnosti
                :kratica=restaurantInfo[0].kratica
                :id=this.$route.params.id
            />
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
            workingHours: ["08:00-23:00", "08:00-23:00", "08:00-23:00", "08:00-23:00", "08:00-02:00", "08:00-02:00", "NERADNO"],
            pogodnosti: ["Besplatan WiFi", "Dostava", "Pet Friendly", "Moguča rezervacija", "Parking", "Karitčno plaćanje", "Testiranje"]
        }
    },
    
}
</script>


<style scoped>

</style>