<template>
    <div>
        <label>Country</label>
        <div>
            <input v-model.number="country" @keyup="getCapital()"/>
        </div>
        <label>Capital</label>
        <div>
            <input v-model.number="city" @keyup="getCountry()"/>
        </div>
    </div>
</template>


<script>
export default {
    name: 'Capital',
    data(){
        return {
            country: "Croatia",
            city: "Zargeb",
        }
    },
    methods: {
        getCapital(){
            var country = this.country;
            this.$store.state.mapa.forEach(element => {
                if(element.country.toLowerCase() == country.toLowerCase()){
                    this.city = element.city;
                }
            });
        },
        getCountry(){
            var city = this.city;
            this.$store.state.mapa.forEach(element => {
                if(element.city != null && element.city.toLowerCase() == city.toLowerCase()){
                    this.country = element.country;
                }
            });
        },
    },
}
</script>


<style scoped>

</style>