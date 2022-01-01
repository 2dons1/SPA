<template>
    <h3>Today is: {{this.date}}</h3>
    <h3>The time is {{this.time}}</h3>
</template>

<script>
export default {
    name: 'Clock',
    data() {
        return {  
            time: new Date().toLocaleTimeString("hr-HR"),
            date: new Date().toLocaleDateString("hr-HR")
        }
    },
    mounted(){
        window.setInterval(() => {
            this.time = new Date().toLocaleTimeString("hr-HR");
            this.date = new Date().toLocaleDateString("hr-HR");
        }, 1000)
    }
}

</script>

<style scoped>

</style>