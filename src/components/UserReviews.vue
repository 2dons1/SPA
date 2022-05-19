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
    name: 'UserReviews',
    props: {
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
                        "Authorization": 'Bearer ' + localStorage.getItem('token').slice(1, -1)
                    }
            };
            const res = await fetch('http://localhost:3000/users/' + this.$store.getters.getUser.username + '/reviews', getOptions);
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