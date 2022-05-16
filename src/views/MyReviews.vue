<template>
    <div>
        <h3>Moje recenzije</h3>

        <UserReviews />

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