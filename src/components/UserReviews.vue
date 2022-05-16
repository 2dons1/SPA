<template>
    <div>
        <div class="cards"> 
            <div v-bind:key="review.name" v-for="review in reviews">
                <ReviewCard
                    :user_id = review.user_id 
                    :review_text = review.review_text
                    :review_title = review.review_title
                    :id = review.id
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
            const res = await fetch('http://localhost:3000/restaurant/' + 4 + '/reviews'); // Daj mi sve recenzije nekog korisnika. Treba mi id recenzije tu isto.
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