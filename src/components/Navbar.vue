<template>
    <div class="navbar">
        <ul>
            <li :class="this.$route.path == '/' ? 'active' : 'none'"><router-link to="/">Home</router-link></li>
            <!-- Probaj skuzit kako stavit da je active samo ako pocinje s /restaurants -->
            <li :class="this.$route.path == '/restaurants' ? 'active' : 'none'"><router-link to="/restaurants">Restaurants</router-link></li>
            <!-- Ovo se prikazuje samo ako je ulogirani korisnik ujedno i ugostitelj. -->
            <li :class="this.$route.path == '/ugostitelj/objekti' ? 'active' : 'none'"><router-link to="/ugostitelj/objekti">My Restaurants</router-link></li>
        </ul>
    </div>
</template>

<script>
export default{
    name: 'Navbar'
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

li {
  float: left;
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
</style>
