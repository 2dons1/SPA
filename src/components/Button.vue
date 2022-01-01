<template>
    <div>
        <button @click="$emit('do-something')" class="btn" :style="{background: color}">{{text}}</button>
    </div>
</template>


<script>
    export default {
        name: 'Button',
        props: {
            text: String,
            color: String
        },
        emits: ['do-something']
    }
</script>


<style scoped>
    button{
        margin-top: 5px;
        margin-left: 5px;
        border: none;
        padding: 10px;
        border-radius: 10px;
        color: black;
    }
</style>