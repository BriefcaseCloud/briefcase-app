<template>
  <div id="app">
    <Projects />
  </div>
</template>

<script>
import Projects from './components/Projects.vue'

export default {
  name: 'app',
  components: {
    Projects
  }
}
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Roboto:400,700');

    body {
        background-color: #EEEEEE;
        font-family: 'Roboto', sans-serif;
        display: grid;
        grid-template-rows: auto;
        justify-items: center;
        align-items: center;
    }
    body, html {
        margin: 0;
        height: 100%;
    }
    #app {
        padding-top: 10%;
        padding-left: 15%;
        padding-right: 15%;
        position: fixed;
        width: 70%;
    }
</style>
