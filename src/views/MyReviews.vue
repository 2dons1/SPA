<template>
    <div>
        <h3>Moje recenzije</h3>

        <UserReviews data-test="user-reviews"/>

    </div>
</template>

<script>
import UserReviews from '../components/UserReviews.vue'

export default {
    name: "MyReviews",
    components: {
        UserReviews,
    }

}
</script>

<style scoped>

</style>