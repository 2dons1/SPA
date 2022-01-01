<template>
    <div class="navbar">
        <ul>
            <li :class="this.$route.path == '/' ? 'active' : 'none'"><router-link to="/">Home</router-link></li>
            <li :class="this.$route.path == '/countries' ? 'active' : 'none'"><router-link to="/countries">Countries</router-link></li>
            <li :class="this.$route.path == '/capital' ? 'active' : 'none'"><router-link to="/capital">Capital</router-link></li>
            <li :class="this.$route.path == '/clock' ? 'active' : 'none'"><router-link to="/clock">Clock</router-link></li>
            <li :class="this.$route.path == '/about' ? 'active' : 'none'"><router-link to="/about">About</router-link></li>
            <Button @do-something="buttonClicked" text="Emit-Button" :color=this.color></Button>
        </ul>
    </div>
</template>

<script>
import Button from '../components/Button'
export default{
    name: 'Navbar',
    components: {
      Button
    },
    data(){
      return {
        color: ""
      }
    },
    methods:{
      buttonClicked(){
        if(this.color == "green"){        
          this.color = "yellow";
        }
        else if(this.color == "yellow"){
          this.color = "red";
        }
        else{
          this.color = "green";
        }
      }
    },
    created() {
      this.text = "Green";
      this.color = "green";
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
