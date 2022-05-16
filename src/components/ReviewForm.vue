<template>
    <div>
        <form @submit.prevent="handleSubmit" id="review">
            <h3 class="title">Ostavi recenziju</h3>

            <label>Naslov: </label>
            <input v-model="title" type="text" required>

            <label>Tvoje iskustvo:</label>
            <textarea v-model="review" rows="4" cols="50" required></textarea>

            <div class="submit">
                <button>Recenziraj</button>
            </div>
            <p class="thank-you" v-if="success">Hvala na recenziranju!</p>
            <p class="error" v-if="error">Desila se greška!</p>
        </form>
        <p >Naslov recenzije za objekt {{ id }}: {{ title }}</p>
        <p >Tekst recenzije za objekt {{ id }}: {{ review }}</p>

    </div>
</template>


<script>
export default {
    name: 'ReviewForm',
    props: {
      id: String
    },
    data(){
        return{
           review: '',
           title: '',
           success: false,
           error: false,
        }
    },
    methods:{
        async handleSubmit(){
            // Objavi recenziju, treba mi tekst recenzije, tko objavljuje recenziju i za koji objekt.
            const postOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    {  
                        "title": this.title,
                        "text": this.review,
                        "user_id": this.$store.getters.getUser.username, // Zasda je 1 jer nisam jos napravio user auth i te stvari po rolama.
                        "restaurant_id": this.id
                    }
                )
            };
            // Dobio si response nazad, valjda ce tu pisat ako nesto ne valja.
            const response = await fetch("http://localhost:3000/review", postOptions);
            const data = await response.json();
            console.log(data)
            console.log("test")
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

.thank-you{
    border: solid;
    border-color: green;
    background: rgba(0, 255, 0, 0.425);
    padding: 10px;
    border-radius: 10px;
    color: black;
}


textarea{
  resize: none;
  margin-right: 0px;
}

input, select, textarea{
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid #ddd;
    color: #555;
}

</style>