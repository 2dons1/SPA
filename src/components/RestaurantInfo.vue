<template>
  <div>

        <div class="image">
            <img :src="require(`@/assets/image3.jpg`)" alt="neka slika tamo"> <!-- 1000x350 -->
        </div>
        <h2>{{ name }}</h2>
        <div class="info">
            <div class="buttons">
                <a href="#review"><button class="btn">Napisi recenziju</button></a> <!-- Prikazi samo ako je korisik gost -->
                <a href="#edit"><button class="btn-edit">Uredi</button></a> <!-- Prikazi samo ako je korisnik ugostitelj i ovo je njegov objekt -->
                <button class="btn-delete" @click="deleteObject">Ukloni</button> <!-- Prikazi samo ako je korinsik ugostitelj i ovo je njegov objekt -->
                <p class="timestamp">Objavljeno: {{ time }}</p>
            </div>

            

            <div class="grid-container">
                <div class="grid-item">
                    <h4>Radno vrijeme: </h4>
                    <p><b>Pon:</b> {{workingHours[0]}}</p>
                    <p><b>Uto:</b> {{workingHours[1]}}</p>
                    <p><b>Sri:</b> {{workingHours[2]}}</p>
                    <p><b>Čet:</b> {{workingHours[3]}}</p>
                    <p><b>Pet:</b> {{workingHours[4]}}</p>
                    <p><b>Sub:</b> {{workingHours[5]}}</p>
                    <p><b>Ned:</b> {{workingHours[6]}}</p>
                </div>

                <div class="grid-item">
                    <h4>Pogodnosti: </h4>
                    <div v-bind:key="pogodnost" v-for="pogodnost in pogodnosti">
                        <p>{{ pogodnost }}</p>
                    </div>
                </div>

                <div class="grid-item">
                    <h4>Lokacija: </h4>
                    <p>Adresa: {{ address }}</p>
                    <p>Telefon: {{ phone }}</p>
                </div>
            </div>
        </div>
    
  </div>
</template>

<script>
export default {
    name: "RestaurantInfo",
    props: {
        name: String,
        address: String,
        phone: String,
        time: String,
        workingHours: Array,
        pogodnosti: Array,
        id: String
    },
    methods: {
        // Trebalo bi stavit confirm button prije nego se izvede sve ovo ali zasada nije bitno.
        async deleteObject(){
            const deleteOptions = {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    {  
                        "user_id": 1,
                        "restaurant_id": this.id
                    }
                )
            };
            // Dobio si response nazad, valjda ce tu pisat ako nesto ne valja.
            const response = await fetch("http://localhost:3000/review", deleteOptions);
            const data = await response.json();
            console.log(data)
            
            // Objekt je sada izbrisan, posalji korisnika natrag na "MyRestaurants".
            this.$router.push({ name: 'MojiObjekti' })
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