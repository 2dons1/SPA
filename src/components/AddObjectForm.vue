<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <h3 class="title">Dodaj novi objekt</h3>

            <label data-test="naziv">Naziv:</label>
            <input placeholder="kafić" v-model="name" type="text" required>

            <label data-test="adresa">Adresa:</label>
            <input placeholder="unska 3" v-model="address" type="text" required>

            <label data-test="grad">Grad: </label>
            <select v-model="city">
                <option :value="grad" v-bind:key="grad" v-for="grad in gradovi">{{grad}}</option>
            </select>

            <label data-test="telefon">Telefon:</label>
            <input placeholder="091 234 5678" v-model="phone" type="text" required>

            <!-- Ovo neka bude ovako zasada, kasnije treba neki fancy nacin za dodavanje -->
            <label data-test="radno">Radno vrijeme:</label>
            <input placeholder="08:00-02:00" v-model="workHours" type="text" required>

            <!-- Ovo neka bude ovako zasada, kasnije treba neki fancy nacin za dodavanje -->
            <label data-test="pogodnosti">Pogodnosti:</label>
            <input placeholder="Internet,Pargking,Hrana,Kokteli,Pušački prostor..." v-model="amenities" type="text" required>

            <label data-test="vrsta">Vrsta: </label>
            <select v-model="type">
                <option value="caffe">Caffe</option>
                <option value="restoran">Restoran</option>
                <option value="bistro">Bistro</option>
                <option value="noćni klub">Noćni klub</option>
                <option value="bar">Bar</option>
            </select>

            <div class="submit">
                <button>Dodaj</button>
            </div>
        </form>

        <!-- 
        <p>Naziv: {{ name }}</p>
        <p>Adresa: {{ address }}</p>
        <p>Grad: {{ city }}</p>
        <p>Telefon: {{ phone }}</p>
        <p>Radno vrijeme: {{ workHours }}</p>
        <p>Pogodnosti: {{ amenities }}</p>
        <p>Type: {{ type }}</p>
        -->

    </div>
</template>


<script>
export default {
    name: 'AddObjectForm',
    data(){
        return{
            name: '',
            address: '',
            city: 'Zagreb',
            phone: '',
            workHours: '',
            amenities: '',
            type: 'caffe', // Default uloga neka bude gost.,
            gradovi: this.$store.getters.getGradovi
        }
    },
    methods:{
        async handleSubmit(){
            // Post request na server.
            // Trebaju mi informacije o objektu i tko salje request tj. ugostiteljev id.
            const postOptions = {
                method: "POST",
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
                        "vlasnik": this.$store.getters.getUser.username, // Procitaj iz vuex koji je user trenutno ulogiran. 
                    }
                )
            };
            // Dobio si response nazad, valjda ce tu pisat ako nesto ne valja.
            const response = await fetch("http://localhost:3000/objects", postOptions);
            console.log(response)
            const data = await response.json();
            console.log(data)

            // Reload page.
            this.$router.go()
        }
    }
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