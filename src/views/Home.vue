<template>
    <div>
        <h3 v-if="this.$store.getters.getUser">Hi user, your username is: {{ this.$store.getters.getUser.username }} and your role is: {{ this.$store.getters.getUser.uloga }}</h3>
        <div v-else>
            <h3>You are an anonymous user, your experience is restricted.</h3>
            <h3>You should <router-link to="/login">Login</router-link> if you have an account or <router-link to="/register">Register</router-link> if you don't.</h3>
        </div>
        
    </div>
</template>

<script>

export default{
    name: 'Home',
    components:{

    },
}
</script>

<style scoped>

</style>