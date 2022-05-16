<template>
    <div class="card" style="width: 18rem;">
        <!-- Informacije o recenziji-->
        <div class="card-body">
            <h4>{{ user_id }} - {{ review_title }}</h4>
            <p class="card-text">{{review_text}}</p>
            <a href="#" class="card-link">Prikaži više</a>
            <p></p>
            <a href="#" class="delete">Ukloni</a>
        </div>

        <div class="card-footer">
          <p class="timestamp">Objavljeno: 10.3.2022 15:46</p>
          <p v-if="edited" class="edited">Edited</p>
        </div>

        <!-- KOMENTARI, makni ovo kasnije u zasebnu komponentu. -->
        <div class="dropdown">
          <button class="dropbtn">Komentari</button>
          <div class="dropdown-content">
            <a v-for="comment in comments" v-bind:key="comment" >
              {{comment.username + ": " + comment.text}}

              <!-- Stavi ovo samo ako je vlasnik komentara ujedno i trenutni ulogirani korisnik.-->
              <div v-if="this.$store.getters.getUser">
                <form @submit.prevent v-if="comment.user_id == this.$store.getters.getUser.id">
                  <button class="comment-delete" v-on:click="handleDelete(comment)">Ukloni komentar</button>
                </form>
              </div>

            </a>
            
            <!-- Komentirat smiju samo ulogirani korisnici i to samo gost i ugostitelj. -->
            <div v-if="this.$store.getters.getUser">
            <a v-if="this.$store.getters.getUser.uloga == 'gost' || this.$store.getters.getUser.uloga == 'ugostitelj'">
              <form @submit.prevent="handleSubmit" class="comment-form">
                <input type="text" v-model="comment" class="comment-input" placeholder="Napišite komentar...">
                <button class="comment-submit">Ostavi komentar</button> <!-- Ovo smo sakrili -->
              </form>
            </a>
            </div>

          </div>
        </div>

    </div>
</template>



<script>
export default {
        name: 'ReviewCard',
        data(){
          return{
              edited: true,
              comment: '',
              comments: []
          }
        },
        props: {
            user_id: String, // Trenutni ulogirani user.
            review_text: String, // Tekst recenzije.
            review_title: String, // Naslov recenzije.
            id: Number // id recenzije, ovo koristiti kako bi dobio sve komentare te recenzije.
        },
        methods:{
          // Komentiranje recenzije.
          async handleSubmit(){
            // Komentar ne smije biti prazan.
            if(this.comment != ''){
              console.log("User: " + this.$store.getters.getUser.id + " je ostavio komentar: " + this.comment + " na recenziji: " + this.id);
              // Napravi POST request na server s komentarom, id_korisnika, id_recenzije koju komentiras.
              const postOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    { 
                        "user_id": this.$store.getters.getUser.id,
                        "review_id": this.id,
                        "comment_text": this.comment
                    }
                )
              };
              const response = await fetch("http://localhost:3000/comments", postOptions);
              console.log(response)
              if(response.status == 201){
                // Ako je POST uspjesan dodaj komentar u listu komentara bez refresha stranice, komentar ce biti "lazno" dodan ali je zapravo tamo i nakon refresha.
                this.comments.push(
                  {
                    text: this.comment,
                    user_id: this.$store.getters.getUser.id,
                    username: this.$store.getters.getUser.username,
                    review_id: this.id,
                    comment_id: 4 // Ovo mi treba backend vratiti.
                  }
                );
                // Pobrisi input field.
                this.comment = '';
              }
            }
          },
          // Brisanje komentara s recenzije.
          async handleDelete(comment){ // comment sadrži sve informacije o komentaru(text, user_id, comment_id mi sigurno trebaju)
            console.log("Obrisi ovaj komentar: " + comment.text)
            let text = "Are you sure about that?";
            if (confirm(text) == true) {
                // Napravi DELETE request na server sa id_komentara.
                const deleteOptions = {
                    method: "DELETE",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": 'Bearer ' + localStorage.getItem('token') 
                    },
                    body: JSON.stringify(
                      {  
                        "comment_id": comment.comment_id
                      }
                    )
                };
                // Dobio si response nazad, valjda ce tu pisat ako nesto ne valja.
                const response = await fetch("http://localhost:3000/comments", deleteOptions);
                console.log(response);
                // const data = await response.json();
                if(response.status == 200){
                  // Ako je DELETE uspjesan makni taj komentar iz liste komentara bez refresha stranice, komentar ce bit "lazno" maknut ali je zapravo maknut i nakon refresha.
                  this.comments = this.comments.filter(komentar => komentar != comment);
                }

            } else {
              text = "You canceled!";
            }
          },
          // Dohvat svih komentara za određenu recenziju.
          async fetchComments(){

            const getOptions = {
                method: "GET",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer ' + localStorage.getItem('token') 
                },
                body: JSON.stringify(
                  {  
                    "review_id": this.id
                  }
                )
            }

            const res = await fetch('http://localhost:3000/comments', getOptions);
            const data = await res.json();
            // console.log(data);
            return data;
          },
        },
        async created(){
          this.comments = [ // await this.fetchComments();
              {
                text: "Moje iskustvo je bilo jako slicno navedenom, slazem se s recenzijom",
                user_id: 2,
                username: "2Dons",
                review_id: 1,
                comment_id: 1
              },
              {
                text: "Hvala na ostavljenoj recenziji.",
                user_id: 1,
                username: "Vlasnik",
                review_id: 1,
                comment_id: 2
              },
              {
                text: "Ja sam isto bio tu, meni je bilo grozno. :(",
                user_id: 3,
                username: "Sosko",
                review_id: 1,
                comment_id: 3
              },
            ]
        },
    }

</script>



<style scoped>
* {
  margin: 0px;
  padding: 0px;
  text-align: start;
}

body {
  background-color: gray;
  color: black;
  font-family: helvetica, sans-serif;
}

main {
  background-color: #EDFDED;
  max-width: 1200px;
  margin: auto;
  min-height: 100vw;
}

h2 {
  padding: 20px 0px;
  text-align: center;
}

.card {
  width: 320px;
  padding: 20px;
  margin: 10px;
  border: 1px solid #d7d7d7;
  border-radius: 2px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.15);
  background-color: white;
}

.card h3 {
  color: rgb(0, 0, 0);
}

.card p {
  color: #757575;
  line-height: 1.5;
  padding-top: 10px;
}

.card-title{
    color: black;
    text-align: start;
}

.card-text{
    margin-bottom: 10px;
}

.card-link{
    text-decoration: none;
}

.card-link:active{
    text-decoration: none;
    color: blue;
}

.card-link:hover{
    text-decoration: none;
    color: rgb(2, 2, 122);
}

.delete{
    color: red;
    text-decoration: none;
}

.delete:hover{
    color: rgb(165, 0, 0);
    text-decoration: none;
}

.timestamp{
  font-size: 13px;
  text-align: right;
  font-style: italic;
}

.edited{
  font-size: 13px;
  text-align: right;
  font-style: italic;
}

.dropbtn {
  background-color: #006B86;
  color: white;
  padding: 10px 10px 10px 10px;
  font-size: 16px;
  border: none;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 300px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {background-color: #ddd;}

.dropdown:hover .dropdown-content {display: block;}

.dropdown:hover .dropbtn {background-color: #015368;}

.comment-input{
  padding: 7px;
  border-radius: 10px;
  border: none;
  width: 80%;
}

.comment-input:hover{
  border: solid 2px #006B86;
}
.comment-submit{
  display: none;
}

.comment-delete{
  color: red;
  background-color: white;
  padding: 5px 10px 5px 10px;
  border-radius: 10px;
  border: 1px grey;
}

.comment-delete:hover{
  background-color: rgba(255, 0, 0, 0.103);
}

</style>