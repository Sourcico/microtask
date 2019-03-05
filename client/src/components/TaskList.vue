<template>

    <div id="item-list">
        <form @submit.prevent="addElement">
            <input type="text" v-model="itemName" style="margin: 5px;">
            <button class="btn btn-success" v-on:click="addElement(itemName)">+</button><br><br>
            <ul>
                <li v-for="(item, index) in tasks" v-bind:key="index">
                    
                    <div id="showP" v-if="showParagraph">
                        <input type="text" v-model="item.name" style="margin: 2px;">
                        <button v-on:click="save">Save</button>
                    </div>
                    <TaskStep id="itm2" v-if="!showParagraph" v-bind:name="item.name" style="margin: 2px;"></TaskStep>
                    <input type="checkbox" id="checkbox2"  v-if="!showParagraph" style="margin: 1px;">
                    <button class="btn btn-danger" v-if="!showParagraph" v-on:click="removeElement(index)" style="margin: 1px;">Delete</button>
                    <br>
                </li>
                <button class="btn btn-info" v-if="!showParagraph" @click="showParagraph = !showParagraph" style="margin: 1px;">Edit</button>
                <button class="btn btn-info" v-if="showParagraph" @click="showParagraph = !showParagraph" style="margin: 1px;">Cancel</button>
            </ul>
        </form>
    </div>

</template>

<script>
import TaskStep from '@/components/TaskStep.vue';
import json from '@/json/pr2.json';
import api from './../services/api/api.js';


export default {
    name: 'Task',
    components: {
        TaskStep
    },
    data () {
        const data = {
            tasks: {},
            showParagraph: false
        };

        api.getListData().then(function(response) {
            //console.log('RESPONSE BE ', response);
            data.tasks = response.data.data;
        });
        console.log('DATAAAAAAAA ', data);
        return data;

    },
    methods: {
        removeElement: function(index){
            this.tasks.splice(index, 1);
        },
        addElement: function(){
            this.tasks.push({ id: 2, message: this.itemName });
            //api.deleteHome();
        },

        getListData: function (){
            return api.getListData();
        }//ovaa funckija ja ima vo api.js
    }
}



</script>

<style scoped>
    ul {
        list-style-type: none;
        padding: 0;
    }
    #checkbox2 {
        display: inline-block;
    }
    #itm2 {
        display: inline-block;
    }
    
</style>

