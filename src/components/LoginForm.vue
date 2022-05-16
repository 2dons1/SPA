<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <h3 class="title">Prijava</h3>

            <label>Korisničko ime:</label>
            <input v-model="username" type="text" required>

            <label>Lozinka:</label>
            <input v-model="password" type="password" required>

            <p class="error" v-if="error">{{ error }}</p>

            <div class="submit">
                <button>Prijavi se</button>
            </div>
        </form>

        <p>Username: {{ username }}</p>
        <p>Lozinka: {{ password }}</p>

    </div>
</template>


<script>
export default {
    name: 'LoginForm',
    data(){
        return{
            username: '',
            password: '',
            error: ''
        }
    },
    methods:{
        async handleSubmit(){
            // Provjeri format passworda.

            // Post request na server.
            const postOptions = {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    {  
                        "username": this.username,
                        "password": this.password, // Ovo bi trebalo hashirat i posolit prije nego sto se salje na backend, isto vrijedi i s registracijom.
                    }
                )
            };
            // Dobio si response nazad, valjda ce tu pisat ako nesto ne valja.
            const response = await fetch("http://localhost:3000/login", postOptions); // '/auth/login'
            const data = await response.json();

            // Login je uspjesan.
            if(data.status === 200){
                this.error = '';

                // Postavi usera i njegov access_token u local storage.
                localStorage.setItem('user', JSON.stringify(data.user)); // Mogu odma dobit usera ili ga mogu trazit po tokenu kasnije.
                localStorage.setItem('token', JSON.stringify(data.access_token));
                this.$store.dispatch('setUser', data.user);
                this.$store.dispatch('setToken', data.token);

                console.log(this.$store.getters.getUser)
                console.log(this.$store.getters.getToken)

                // Bez obzira tko se ulogirao posalji ga na homepage.
                this.$router.push({ name: 'Home' }) // zasada je ovo Homepage.
               
            }
            else{
                this.error = 'Neispravni kredencijali!'
            }
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

    margin-bottom: 0px;
}

</style>