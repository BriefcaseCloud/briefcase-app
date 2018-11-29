<template>
    <div class="usecases">
        <ul>
            <li v-for="(data, index) in usecases" :key="index">
                {{data.name}}
                <i class="fa fa-minus-circle" v-on:click="removeUseCase(index)"></i>
            </li>

            <li>
                <form @submit.prevent="addUseCase">
                    <input type="text" placeholder="Add usecase..." v-model="usecase"/>
                </form>
            </li>
        </ul>
    </div>
</template>


<script>
    export default {
        name: 'UseCases',

        props: {
            usecases: Array,
        },

        data() {
            return {
                usecase: '',
            };
        },

        methods: {

            addUseCase() {
                this.usecases.push(this.usecase);
                this.usecase = '';
            },

            removeUseCase(id) {
                this.usecases.splice(id, 1);
            },
        },
    };
</script>

<style scoped>
    @import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
    @import "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";

    ul {
        margin: 0;
        padding: 0;
        list-style-type: none;
    }

    ul li {
        padding: 10px;
        font-size: 1em;
        background-color: azure;
        border-bottom: 5px solid lightgrey;
        color: darkgrey;
        text-align: left;
    }

    input {
        border: 0;
        background-color: transparent;
    }

    input:focus, textarea:focus {
        outline: none;
    }

    i {
        float: right;
    }


</style>