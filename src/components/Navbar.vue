<template>
    <div class="navbar">
        <ul>
            <li :class="this.$route.path == '/' ? 'active' : 'none'"><router-link to="/">Početna</router-link></li>

            <!-- Ovo nemoj prikazat adminu -->
            <li v-if="!(this.$store.getters.getUser && this.$store.getters.getUser.uloga == 'admin')" :class="this.$route.path == '/objects' ? 'active' : 'none'"><router-link to="/objects">Objekti</router-link></li>

            <!-- Ovo se prikazuje samo ako je ulogirani korisnik ujedno i gost. -->
            <div v-if="this.$store.getters.getUser">
            <li v-if="this.$store.getters.getUser.uloga == 'gost'" :class="this.$route.path == '/gost/reviews' ? 'active' : 'none'"><router-link to="/gost/reviews">Moje recenzije</router-link></li>
            </div>

            <!-- Ovo se prikazuje samo ako je ulogirani korisnik ujedno i ugostitelj. -->
            <div v-if="this.$store.getters.getUser">
            <li  v-if="this.$store.getters.getUser.uloga == 'ugostitelj'" :class="this.$route.path == '/ugostitelj/objekti' ? 'active' : 'none'"><router-link to="/ugostitelj/objekti">Moji objekti</router-link></li>
            </div>

            <div v-if="this.$store.getters.getUser">
            <li  v-if="this.$store.getters.getUser.uloga == 'admin'" :class="this.$route.path == '/admin' ? 'active' : 'none'"><router-link to="/admin">Admin Panel</router-link></li>
            </div>

            <li class="login" :class="this.$route.path == '/login' ? 'active' : 'none'" v-if="!this.$store.getters.getUser"><router-link to="/login">Login</router-link></li>
            <li :class="this.$route.path == '/register' ? 'active' : 'none'" v-if="!this.$store.getters.getUser"><router-link to="/register">Register</router-link></li>

            <li class="user" v-if="this.$store.getters.getUser"><router-link to="">{{ this.$store.getters.getUser.username }}</router-link></li>
            <li class="logout" @click="handleLogout" v-if="this.$store.getters.getUser"><router-link to="">Logout</router-link></li>
            

        </ul>
    </div>
</template>

<script>
export default{
    name: 'Navbar',
    methods:{
      handleLogout(){
        let text = "Are you sure about that?";
        if (confirm(text) == true) {
          this.$store.dispatch('logout');
          this.$router.push({ name: 'Home' })
        } else {
          text = "You canceled!";
        }
        
      }
    }
}
</script>

<style scoped>


ul {
  display: flex;
  justify-content: left;
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover:not(.active) {
  background-color: #222222
}

.navbar{
    margin-bottom: 15px;
}
.active {
  background-color: #006B86;
}

.login{
  margin-left: auto;
}

.login a{
  color: white;
  margin-left: auto;
}

.user{
  margin-left: auto;
}

.user{
  margin-left: auto;
}

.logout a{
  color: red;
}

</style>
