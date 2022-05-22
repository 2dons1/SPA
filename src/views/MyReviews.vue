<template>
    <div>
    
        <div class="master-detail">
            <div class="master">
                <table id="customers">
                    <tr>
                        <th>Moje recenzije</th>
                    </tr>
                    <tr v-bind:key="review" v-for="review in reviews">
                        <td @click="changeDetail(review)" >{{review.naslov}} - {{review.objekt.naziv}}</td>
                    </tr>
                </table>
            </div>

            <div v-if="currentReview" class="detail">
                <ReviewCard class="review" 
                    :gostUsername = currentReview.gostUsername
                    :datumStvaranja = currentReview.datumStvaranja
                    :naslov = currentReview.naslov
                    :tekst = currentReview.tekst
                    :uređeno = currentReview.uređeno
                    :objekt = currentReview.objekt
                />
            </div>
        </div>

        <!-- <UserReviews data-test="user-reviews"/> -->

    </div>
</template>

<script>
//import UserReviews from '../components/UserReviews.vue'
import ReviewCard from '../components/ReviewCard.vue'

export default {
    name: "MyReviews",
    components: {
        // UserReviews,
        ReviewCard
    },
    data(){
        return {
            currentReview: null,
            reviews: []
        }
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
        changeDetail(review){
            this.currentReview = review;
        }
    },
    async created(){
        this.reviews = await this.fetchReviews();
        this.currentReview = this.reviews[0]
    }

}
</script>

<style scoped>
ul{
    list-style-type: none;
}

.review-button{
    margin-bottom: 10px;
    padding: 10px;
}

.review{
    margin: auto;
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

.master{
    margin-bottom: 10px;
}

</style>