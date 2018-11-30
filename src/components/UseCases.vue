<template>
    <div class="usecases">
        <ul>
            <li v-for="(data, index) in useCases" :key="index">
                <div class = useCaseName>
                    {{data.name}}
                </div>
                <div class="useCaseIcons">
                    <i class="fa fa-minus-circle" v-on:click="removeUseCase(index)"></i>
                    <i class="fa fa-edit" v-on:click="editUseCase(index)"></i>
                </div>

            </li>

            <li>
                <form @submit.prevent="addUseCase">
                    <input type="text" placeholder="Add usecase..." v-model="useCase"/>
                </form>
            </li>
        </ul>
    </div>
</template>


<script>
    export default {
        name: 'UseCases',

        props: {
            useCases: Array,
        },

        data() {
            return {
                useCase: '',
            };
        },

        methods: {

            addUseCase() {
                //Get template
                //Fill template
                //Post
                this.usecases.push(this.usecase);
                this.usecase = '';
            },

            editUseCase(id) {

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

    .useCaseIcons {
        flex-grow: 1;
    }

    .useCaseName {
        flex-grow: 8;
    }

    ul {
        margin: 0;
        padding: 0;
        list-style-type: none;
    }

    ul li {
        display: flex;
        flex-direction: row;
        padding: 10px;
        font-size: 1em;
        background-color: azure;
        border-bottom: 1px solid lightgrey;
        color: black;
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
        padding: 5px;
    }


</style>