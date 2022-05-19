<template>
    <div>
        <div class="cards"> 
            <div v-bind:key="review.name" v-for="review in reviews">
                <ReviewCard
                    :gostUsername = review.gostUsername
                    :datumStvaranja = review.datumStvaranja
                    :naslov = review.naslov
                    :tekst = review.tekst
                    :uređeno = review.uređeno
                    :objekt = review.objekt
                />
            </div>
        </div>
    </div>
</template>



<script>
import ReviewCard from '../components/ReviewCard'

export default{
    name: 'Reviews',
    props: {
        id: String, // Ovo tu je id od restorana cije recenzije zelimo.
    },
    components:{
        ReviewCard
    },
    methods:{
       async fetchReviews(){
            const getOptions = {
                    method: "GET",
                    headers: { 
                        "Content-Type": "application/json",
                    }
            };
            const res = await fetch('http://localhost:3000/objects/' + this.id + '/reviews', getOptions); // Ovo treba mijenjat.
            const data = await res.json();
            return data;
        },
    },
    data(){
        return {
        reviews: []
        }
    },
    async created(){
        this.reviews = await this.fetchReviews();
        // console.log(this.reviews)
    }
}
</script>


<style scoped>
    .cards {
        max-width: 1000px;
        margin: 0 auto;
        display: grid;
        grid-gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
    .card {
        background-color: rgba(255, 255, 255, 0.8);
    }
</style>