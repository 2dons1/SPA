<template>
  <div>

        <div class="image">
            <img :src="require(`@/assets/image3.jpg`)" alt="neka slika tamo"> <!-- 1000x350 -->
        </div>
        <h2>{{ naziv }}</h2>
        <div class="info">
            <div v-if="this.$store.getters.getUser" class="buttons"> <!-- Prikazi ovo samo ako je korisnik ulogiran-->
                <a v-if="this.$store.getters.getUser.uloga == 'gost' " href="#review"><button class="btn">Napisi recenziju</button></a> 
                <a v-if="this.$store.getters.getUser.uloga == 'ugostitelj' && this.$store.getters.getUser.id == vlasnik" href="#edit"><button class="btn-edit">Uredi</button></a> <!-- Prikazi samo ako je korisnik ugostitelj i ovo je njegov objekt -->
                <button v-if="this.$store.getters.getUser.uloga == 'ugostitelj' && this.$store.getters.getUser.id == vlasnik" class="btn-delete" @click="deleteObject">Ukloni</button> <!-- Prikazi samo ako je korinsik ugostitelj i ovo je njegov objekt -->
                <button v-if="this.$store.getters.getUser.uloga == 'admin'" class="btn-approve" @click="approveObject">Odobri</button>
                <button v-if="this.$store.getters.getUser.uloga == 'admin'" class="btn-deny" @click="denyObject">Odbi</button>
            </div>
            <p class="timestamp">Objavljeno: {{ datumStvaranja }}</p>

            

            <div class="grid-container">
                <div class="grid-item">
                    <h4>Radno vrijeme: </h4>
                    <p><b>Pon: </b>{{ radnoVrijeme }}</p>
                    <p><b>Uto: </b>{{ radnoVrijeme }}</p>
                    <p><b>Sri: </b>{{ radnoVrijeme }}</p>
                    <p><b>Čet: </b>{{ radnoVrijeme }}</p>
                    <p><b>Pet: </b>{{ radnoVrijeme }}</p>
                    <p><b>Sub: </b>{{ radnoVrijeme }}</p>
                    <p><b>Ned: </b>{{ radnoVrijeme }}</p>
                </div>

                <div class="grid-item">
                    <h4>Pogodnosti: </h4>
                    <div v-bind:key="pogodnost" v-for="pogodnost in pogodnosti">
                        <p>{{ pogodnost }}</p>
                    </div>
                </div>

                <div class="grid-item">
                    <h4>Lokacija: </h4>
                    <p>Adresa: {{ adresa }}</p>
                    <p>Telefon: {{ kontaktBroj }}</p>
                </div>
            </div>
        </div>
    
  </div>
</template>

<script>
export default {
    name: "RestaurantInfo",
    props: {
        id: Number,
        naziv: String,
        adresa: String,
        radnoVrijeme: String,
        kontaktBroj: String,
        datumStvaranja: String,
        potvrden: Boolean,
        vlasnik: Number,
        vrsta: String,
        grad: String,
        fotografije: Array,
        pogodnosti: Array
    },
    methods: {
        // Trebalo bi stavit confirm button prije nego se izvede sve ovo ali zasada nije bitno.
        async deleteObject(){
            let text = "Are you sure about that?";
            if (confirm(text) == true) {
                const deleteOptions = {
                    method: "DELETE",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": 'Bearer ' + localStorage.getItem('token') 
                    },
                    body: JSON.stringify(
                        {  
                            "user_id": this.$store.getters.getUser.id,
                            "restaurant_id": this.id
                        }
                    )
                };
                // Dobio si response nazad, valjda ce tu pisat ako nesto ne valja.
                const response = await fetch("http://localhost:3000/restaurants", deleteOptions);
                const data = await response.json();
                console.log(data)
                
                // Objekt je sada izbrisan, posalji korisnika natrag na "MyRestaurants".
                this.$router.push({ name: 'MojiObjekti' })
            } 
            else {
                text = "You canceled!";
            } 
        },
        async approveObject(){
            let text = "Are you sure about that?";
            if (confirm(text) == true) {
                const postOptions = {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": 'Bearer ' + localStorage.getItem('token') 
                    },
                    body: JSON.stringify( // Vjerovatno mi treba samo id od restorana.
                        {  
                            "user_id": this.$store.getters.getUser.id,
                            "restaurant_id": this.id
                        }
                    )
                };
                // Dobio si response nazad, valjda ce tu pisat ako nesto ne valja.
                const response = await fetch("http://localhost:3000/restaurants", postOptions); // Treba mi ruta za ovo.
                const data = await response.json();
                console.log(data)
                
                // Objekt je sada odobren, posalji admina natrag na njegov panel za odobravanje.
                this.$router.push({ name: 'AdminPanel' })
            } 
            else {
                text = "You canceled!";
            } 
        },
        async denyObject(){
            let razlog = prompt("Razlog odbijanja:", "");
            if ( !(razlog == null || razlog == "") ) {
                console.log(razlog)
                const postOptions = {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": 'Bearer ' + localStorage.getItem('token') 
                    },
                    body: JSON.stringify( // Vjerovatno mi treba samo id od restorana. Tu trebam i razlog ubacit.
                        {  
                            "user_id": this.$store.getters.getUser.id,
                            "restaurant_id": this.id
                        }
                    )
                };
                // Dobio si response nazad, valjda ce tu pisat ako nesto ne valja.
                const response = await fetch("http://localhost:3000/restaurants", postOptions); // Treba mi ruta za ovo.
                const data = await response.json();
                console.log(data)
                
                // Objekt je sada odobren, posalji admina natrag na njegov panel za odobravanje.
                this.$router.push({ name: 'AdminPanel' })
            } 
            else {
                razlog = "You canceled!";
            } 
        },
    }

}
</script>

<style scoped>

img{
  width: 1000px;
  height: 350px;
  object-fit: cover;
  object-position: 80% 100%;
}

.info{
    margin: auto;
    width: 1000px;
}

.buttons{
    text-align: left;
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

.btn{
    margin-top: 10px;
    margin-right: 10px;
}

.btn-delete{
    margin-top: 10px;
    margin-right: 10px;
    background-color: rgb(255, 0, 0);
}

.btn-delete:hover{
     background-color: rgb(110, 0, 0);
}

.btn-approve{
    margin-top: 10px;
    margin-right: 10px;
    background-color: #21e04d
}

.btn-approve:hover{
     background-color: #179b36
}

.btn-deny{
    margin-top: 10px;
    margin-right: 10px;
    background-color: red
}

.btn-deny:hover{
     background-color: rgb(153, 0, 0)
}    

.btn-edit{
    margin-top: 10px;
    margin-right: 10px;
    background-color: rgb(255, 187, 0);
}

.btn-edit:hover{
     background-color: rgb(230, 196, 0);
}

.grid-container{
    margin-top: 10px;
    padding: 10px;
    text-align: left;
    width: 100%;

    display: inline-grid;
    grid-template-columns: auto auto auto;
    padding: 10px;
    column-gap: 20px;
}


.timestamp{
  display: inline;
  float: right;
  text-align: right;
  font-style: italic;
}

ul{
    list-style-type: none;
}

li{
    padding: 5px;
}
</style>