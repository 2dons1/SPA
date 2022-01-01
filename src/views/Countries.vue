<template>
    <div>
        <div class="cards"> 
            <div v-bind:key="country.name" v-for="country in countries">
                <Country class="card" 
                    :title=country.name 
                    :capital=country.capital 
                    :population=country.population 
                    :imgLink=country.flags.png
                />
            </div>
        </div>
    </div>
</template>



<script>
import Country from '../components/Country'

export default{
    name: 'Countries',
    props: {
    },
    components:{
        Country
    },
    methods:{
        async fetchCountries(){
            const res = await fetch('https://restcountries.com/v2/all?fields=name,capital,population,flags');
            const data = await res.json();
            return data;
        },
    },
    data(){
        return {
        countries: []
        }
    },
    async created(){
        this.countries = await this.fetchCountries();
    }
}
</script>


<style scoped>
    .cards {
        max-width: 2000px;
        margin: 0 auto;
        display: grid;
        grid-gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
    .card {
        background-color: rgba(255, 255, 255, 0.8);
    }
</style>