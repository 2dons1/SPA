<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <h3 class="title">Uredi objekt</h3>

            <label data-test="naziv">Naziv:</label>
            <input v-model="name" type="text" required>

            <label data-test="adresa">Adresa:</label>
            <input v-model="address" type="text" required>

            <label data-test="grad">Grad: </label>
            <select v-model="city">
                <option :value="grad" v-bind:key="grad" v-for="grad in gradovi">{{grad}}</option>
            </select>

            <label data-test="telefon">Telefon:</label>
            <input v-model="phone" type="text" required>

            <!-- Ovo neka bude ovako zasada, kasnije treba neki fancy nacin za dodavanje -->
            <label data-test="radno">Radno vrijeme:</label>
            <input v-model="workHours" type="text" required>

            <!-- Ovo neka bude ovako zasada, kasnije treba neki fancy nacin za dodavanje -->
            <label data-test="pogodnosti">Pogodnosti:</label>
            <input v-model="amenities" type="text" required>

            <label data-test="vrsta">Vrsta: </label>
            <select v-model="type">
                <option value="caffe">Caffe</option>
                <option value="restoran">Restoran</option>
                <option value="bistro">Bistro</option>
                <option value="noćni klub">Noćni klub</option>
                <option value="bar">Bar</option>
            </select>

            <div class="submit">
                <button>Uredi</button>
            </div>
        </form>

        
        <p>Naziv: {{ name }}</p>
        <p>Adresa: {{ address }}</p>
        <p>Grad: {{ city }}</p>
        <p>Telefon: {{ phone }}</p>
        <p>Radno vrijeme: {{ workHours }}</p>
        <p>Pogodnosti: {{ amenities }}</p>
        <p>Type: {{ type }}</p>
        

    </div>
</template>


<script>
export default {
    name: 'EditObjectForm',
    props: {
        ime: String,
        adresa: String,
        grad: String,
        telefon: String,
        workingHours: String,
        pogodnosti: Array,
        kratica: String,
        id: String,
    },
    data(){
        return{
            name: '',
            address: '',
            city: '',
            phone: '',
            workHours: '',
            amenities: '',
            type: '',
            gradovi: this.$store.getters.getGradovi
        }
    },
    // Ok, ovo moram napravit kako bi se uspjesno prop postavio kao initial data. Inace ce se ponasa nepredvidivo.
    // Ideja je kad netko ide napravit "Edit" objekta da mu se forma odma ispuni sa svim vrijednostima koje objekt trenutno ima
    // pa se onda pise/brise po tome.
    watch: {
        ime: {
            immediate: true,
            handler (newVal) {
                this.name = newVal;
            }
        },
        adresa: {
            immediate: true,
            handler (newVal) {
                this.address = newVal;
            }
        },
        grad: {
            immediate: true,
            handler (newVal) {
                this.city = newVal;
            }
        },
        telefon: {
            immediate: true,
            handler (newVal) {
                this.phone = newVal;
            }
        },
        workingHours: {
            immediate: true,
            handler (newVal) {
                this.workHours = newVal;
            }
        },
        pogodnosti: {
            immediate: true,
            handler (newVal) {
                this.amenities = newVal;
            }
        },
        kratica: {
            immediate: true,
            handler (newVal) {
                this.type = newVal;
            }
        },
    },
    methods:{
        async handleSubmit(){
            const putOptions = {
                method: "PUT",
                headers: { 
                    "Content-Type": "application/json", 
                    "Authorization": 'Bearer ' + localStorage.getItem('token').slice(1, -1)
                },
                body: JSON.stringify(
                    { 
                        "naziv": this.name, 
                        "adresa": this.address,
                        "grad": this.city,
                        "kontaktBroj": this.phone,
                        "vrsta": this.type,
                        "radnoVrijeme": this.workHours,
                        "pogodnosti": (this.amenities).toString().split(","),
                    }
                )
            };
            // Dobio si response nazad, valjda ce tu pisat ako nesto ne valja.
            console.log(this.amenities)
            const response = await fetch("http://localhost:3000/objects/" + this.id, putOptions);
            console.log(response)

            // Reload page.
            this.$router.go()
        }
    },
}
</script>

<style scoped>

form{
    max-width: 420px;
    margin: 30px auto;
    background: #eee;
    text-align: left;
    padding: 40px;
    border-radius: 10px;
}

label{
    color: black;
    display: inline-block;
    margin: 25px 0 15px;
    font-size: 0.6rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
}

input, select{
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid #ddd;
    color: #555;
}

button{
    background: #006B86;
    border: 0;
    padding: 10px 20px;
    margin-top: 20px;
    color: white;
    border-radius: 5px;
}

button:hover{
    background: #003c4b;
}

button:active{
    transform: translateY(4px);
}

.submit{
    text-align: center;
}

.title{
    text-align: center;
    margin: 0px;
}

.error{
    border: solid;
    border-color: red;
    background: rgba(255, 0, 0, 0.425);
    padding: 10px;
    border-radius: 10px;
    color: black;
}
</style>