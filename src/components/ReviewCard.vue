<template>
    <div class="card" style="width: 18rem;">
        <!-- Informacije o recenziji-->
        <div class="card-body">
            <h4>{{ gostUsername }} - {{ naslov }}</h4>
            <p class="card-text">{{ tekst }}</p>

            <!-- Prikazi ovo samo ako je korsnik ulogiran i ako je ovo njegova recenzije.-->
            <div v-if="this.$store.getters.getUser">
              <button  v-if="this.gostUsername == this.$store.getters.getUser.username" class="delete" v-on:click="handleDeleteReview(this.id)">Ukloni</button>
            </div>
            <div v-if="this.$store.getters.getUser">
              <button  v-if="this.gostUsername == this.$store.getters.getUser.username" class="edit" v-on:click="openEditForm()">Uredi</button>
            </div>

        </div>

        <div class="card-footer">
          <p class="timestamp">Objavljeno:{{ datumStvaranja }}</p>
          <p v-if="uređeno" class="edited">Edited</p>

          <!-- Prikazi ovo samo ako si na stranici "Moje recenzije" -->
          <p v-if="this.$route.path == '/gost/reviews'" class="timestamp"><router-link :to="'/objects/' + this.objekt.sid" class="router">{{ objekt.naziv }}</router-link></p>

          <p></p> <!-- Spacer -->
        </div>

        <!-- KOMENTARI, makni ovo kasnije u zasebnu komponentu. -->
        <div class="dropdown">
          <button class="dropbtn">Komentari</button>
          <div class="dropdown-content">
            <!-- Ovo je jedan komentar, tj. for petlja za sve komentare -->
            <a v-for="comment in comments" v-bind:key="comment" >
              {{comment.username + ": " + comment.tekst}}

              <!-- Stavi ovo samo ako je vlasnik komentara ujedno i trenutni ulogirani korisnik.-->
              <div v-if="this.$store.getters.getUser">

                <form @submit.prevent v-if="comment.username == this.$store.getters.getUser.username">
                  <button class="comment-delete" v-on:click="handleDeleteComment(comment)">Ukloni komentar</button>
                </form>

                <form @submit.prevent v-if="comment.username == this.$store.getters.getUser.username">
                  <button class="comment-edit" v-on:click="openEditComment(comment)">Uredi komentar</button>
                </form>

                <form v-if="showEditComment && comment.tekst == this.editingComment" @submit.prevent="handleEditComment(comment)" class="comment-form">
                  <input type="text" v-model="editingCommentTekst" class="comment-input" :placeholder="comment.tekst">
                  <button class="comment-submit">Ostavi komentar</button> <!-- Ovo smo sakrili -->
                </form>

              </div>

            </a>
            
            <!-- Komentirat smiju samo ulogirani korisnici i to samo gost i ugostitelj. -->
            <div v-if="this.$store.getters.getUser">
            <a v-if="this.$store.getters.getUser.uloga == 'gost' || this.$store.getters.getUser.uloga == 'ugostitelj'">
              <form @submit.prevent="handleSubmitComment" class="comment-form">
                <input type="text" v-model="comment" class="comment-input" placeholder="Napišite komentar...">
                <button class="comment-submit">Ostavi komentar</button> <!-- Ovo smo sakrili -->
              </form>
            </a>
            </div>

          </div>
        </div>

        <!-- Popup forma za uredit recenziju -->
        <div v-if="this.showEditForm">
          <EditReviewForm
            :sid=this.objekt.sid
            :naslov=naslov
            :tekst=tekst
          />
        </div>

    </div>
</template>



<script>
import EditReviewForm from '../components/EditReviewForm.vue'

export default {
        name: 'ReviewCard',
        components: {
          EditReviewForm
        },
        data(){
          return{
              edited: true,
              comment: '',
              comments: [],
              showEditForm: false,
              showEditComment: false,
              editingComment: '',
              editingCommentTekst: ''
          }
        },
        props: {
            gostUsername: String,
            datumStvaranja: String,
            naslov: String,
            tekst: String,
            uređeno: Boolean,
            objekt: Object
        },
        // Moram pazit kad dode do promjene recenzije koju gleda da se promjene i komentari.
        watch:{
          objekt: {
            async handler () {
              this.comments = await this.fetchComments();
            },
          },
        },
        methods:{
          // Komentiranje recenzije.
          async handleSubmitComment(){
            // Komentar ne smije biti prazan.
            if(this.comment != ''){
              console.log("User: " + this.$store.getters.getUser.id + " je ostavio komentar: " + this.comment + " na recenziji: " + this.id);
              // Napravi POST request na server s komentarom, id_korisnika, id_recenzije koju komentiras.
              const postOptions = {
                method: "POST",
                headers: { 
                  "Content-Type": "application/json",
                  "Authorization": 'Bearer ' + localStorage.getItem('token').slice(1, -1)
                },
                body: JSON.stringify(
                    { 
                        "tekst": this.comment
                    }
                )
              };
              const response = await fetch('http://localhost:3000/reviews/' + this.objekt.sid + '/' + this.gostUsername, postOptions);
              console.log(response)
              if(response.status == 201){
                // Ako je POST uspjesan dodaj komentar u listu komentara bez refresha stranice, komentar ce biti "lazno" dodan ali je zapravo tamo i nakon refresha.
                /* this.comments.push(
                  {
                    "username": this.gostUsername,
                    "tekst": this.comment,
                  }
                );
                // Pobrisi input field.
                this.comment = ''; */
                this.$router.go()
              }
            }
          },
          // Brisanje komentara s recenzije.
          async handleDeleteComment(comment){ // comment sadrži sve informacije o komentaru(text, user_id, comment_id mi sigurno trebaju)
            console.log("Obrisi ovaj komentar: " + comment.tekst)
            let text = "Are you sure about that?";
            if (confirm(text) == true) {
                // Napravi DELETE request na server sa id_komentara.
                const deleteOptions = {
                    method: "DELETE",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": 'Bearer ' + localStorage.getItem('token').slice(1, -1)
                    }
                };
                // Dobio si response nazad, valjda ce tu pisat ako nesto ne valja.
                const response = await fetch("http://localhost:3000/comments/" + comment.id, deleteOptions);
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
          async handleEditComment(comment){ // comment sadrži sve informacije o komentaru(text, user_id, comment_id mi sigurno trebaju)
            console.log("Uredi ovaj komentar: " + comment.tekst)
            let text = "Are you sure about that?";
            if (confirm(text) == true) {
                
                const putOptions = {
                    method: "PUT",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": 'Bearer ' + localStorage.getItem('token').slice(1, -1)
                    },
                    body: JSON.stringify(
                      {  
                        "tekst": this.editingCommentTekst
                      }
                    )
                };

                // Dobio si response nazad, valjda ce tu pisat ako nesto ne valja.
                const response = await fetch("http://localhost:3000/comments/" + comment.id, putOptions);
                console.log(response);
                // const data = await response.json();
                if(response.status == 200){
                  this.$router.go()
                }

            } else {
              text = "You canceled!";
            }
          },
          async handleDeleteReview(id){ // comment sadrži sve informacije o komentaru(text, user_id, comment_id mi sigurno trebaju)
            console.log("Obrisi ovu recenizju: " + id)
            let text = "Are you sure about that?";
            if (confirm(text) == true) {
                // Napravi DELETE request na server sa id recenzije.
                const deleteOptions = {
                    method: "DELETE",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": 'Bearer ' + localStorage.getItem('token').slice(1, -1)
                    }
                };
                // Dobio si response nazad, valjda ce tu pisat ako nesto ne valja.
                const response = await fetch("http://localhost:3000/objects/" + this.objekt.sid + "/reviews", deleteOptions);
                console.log(response);
                // const data = await response.json();
                if(response.status == 200){
                  // Ako je DELETE uspjesan napravi refresh stranice.
                  this.$router.go();
                }

            } else {
              text = "You canceled!";
            }
          },
          openEditForm(){
            console.log("You are trying to open review edit form for review: " + this.id)
            this.showEditForm = !this.showEditForm;
          },
          openEditComment(comment){
            console.log("You are trying to open comment edit input for comment: " + comment.id)
            this.showEditComment = !this.showEditComment;
            if(!this.editingComment){
               this.editingComment = comment.tekst;
            }
            else{
              this.editingComment = '';
            }
           
          },
          // Dohvat svih komentara za određenu recenziju.
          async fetchComments(){
            
            const getOptions = {
                method: "GET",
                headers: { 
                    "Content-Type": "application/json",
                }
            }

            const res = await fetch('http://localhost:3000/reviews/' + this.objekt.sid + '/' + this.gostUsername, getOptions);
            const data = await res.json();
            return data;
          },
        },
        async created(){
          this.comments = await this.fetchComments();
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

.comment-edit{
  margin-top: 5px;
  color: rgb(255, 187, 0);
  background-color: white;
  padding: 5px 10px 5px 10px;
  border-radius: 10px;
  border: 1px grey;
}

.comment-edit:hover{
  background-color: rgba(255, 187, 0, 0.151);
}

.delete{
  color: red;
  background-color: white;
  padding: 5px 5px 5px 5px;
  border-radius: 10px;
  border: 1px grey;
}

.delete:hover{
  background-color: rgba(255, 0, 0, 0.103);
}

.edit{
  color: rgb(255, 187, 0);
  background-color: white;
  padding: 5px 5px 5px 5px;
  border-radius: 10px;
  border: 1px grey;
}

.edit:hover{
  background-color: rgba(255, 187, 0, 0.151);
}

</style>