<template>
    <div class="card" style="width: 18rem;">
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
    </div>
</template>



<script>
export default {
        name: 'ReviewCard',
        data(){
          return{
              edited: true,
          }
        },
        props: {
            user_id: String,
            review_text: String,
            review_title: String
        },
        methods:{
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

</style>