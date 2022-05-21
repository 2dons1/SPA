<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <h3 class="title">Registracija</h3>

            <label data-test="ime">Ime:</label>
            <input v-model="name" type="text" required>

            <label data-test="prezime">Prezime:</label>
            <input v-model="surname" type="text" required>

            <label data-test="username">Username:</label>
            <input v-model="username" type="text" required>
            <p class="error" v-if="username_error">Korisničko ime već postoji!</p>

            <label data-test="email">Email:</label>
            <input v-model="email" type="email" required>
            <p class="error" v-if="email_error">Email adresa ja zauzeta!</p>

            <label data-test="pwd">Lozinka:</label>
            <input v-model="password" type="password" required>

            <label data-test="uloga">Uloga: </label>
            <select v-model="role">
                <option value="ugostitelj">Ugostitelj</option>
                <option value="gost">Gost</option>
            </select>

            <div class="submit">
                <button>Registriraj se</button>
            </div>
        </form>

        <!--
        <p>Ime: {{ name }}</p>
        <p>Prezime: {{ surname }}</p>
        <p>Username: {{ username }}</p>
        <p>Email: {{ email }}</p>
        <p>Lozinka: {{ password }}</p>
        <p>Role: {{ role }}</p>
        -->

    </div>
</template>


<script>
export default {
    name: 'SignupForm',
    data(){
        return{
            name: '',
            surname: '',
            username: '',
            email: '',
            password: '',
            role: 'gost', // Default uloga neka bude gost.
            username_error: false,
            email_error: false,
        }
    },
    methods:{
        async handleSubmit(){
            // Provjeri format passworda.

            // Post request na server.
            const postOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    { 
                        "username": this.username,
                        "pwd": this.password,
                        "ime": this.name, 
                        "prezime": this.surname,
                        "email": this.email,
                        "uloga": this.role,
                    }
                )
            };
            const response = await fetch("http://localhost:3000/users", postOptions);
            
            if(response.status == 201){
                this.$router.push({ name: 'LoginForm' })
                console.log(response)
            }
            else if(response.status == 409){
                console.log(response)
                this.username_error = true;
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