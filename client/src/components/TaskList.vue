<template>

    <div id="item-list">
        <form method="POST" @submit.prevent="addElement(this.itemName)">
            <input type="text" v-model="itemName" ref="i_name" style="margin: 5px;">
            <input class="btn btn-success" v-on:click="addElement(itemName)" type="submit" value="+">
            <ul>
                <li v-for="(item, index) in tasks" v-bind:key="index">
                    <div id="showP" v-if="showParagraph">
                        <input type="text" v-model="item.name" style="margin: 2px;">
                        <!-- <input class="" v-on:click="updateElement(itemName)" type="submit" value="Save"> -->
                    </div>
                    <TaskStep id="itm2" v-if="!showParagraph" v-model="iName" v-bind:name="item.name" style="margin: 2px;"></TaskStep>
                    <input type="checkbox" id="checkbox2"  v-if="!showParagraph" style="margin: 1px;">
                    <button class="btn btn-danger" v-if="!showParagraph" v-on:click="removeElement(item._id)" style="margin: 1px;">Delete</button>
                    <br>
                </li>
                <button class="btn btn-info" v-if="!showParagraph" @click="showParagraph = !showParagraph" style="margin: 1px;">Edit</button>
                <button class="btn btn-info"  v-on:click="updateElement(iName)" v-if="showParagraph" @click="showParagraph = !showParagraph" style="margin: 1px;">Save</button>
                <button class="btn btn-info" v-if="showParagraph" @click="showParagraph = !showParagraph" style="margin: 1px;">X</button>
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
            data.tasks = response.data.data;
        });
        return data;

    },
    methods: {
        addElement: function(itemName){
            this.tasks.push({name: itemName });
            return api.addElement(itemName);
        },

        // updateElement: function(iName){
        //     this.tasks.push(iName);
        //     return api.updateElement(iName);
        // },

        // updateElement: function(index){
        //     this.tasks.push(index);
        //     return api.updateElement(index);
        // },

        removeElement: function(index){
            this.tasks.splice(index);
            return api.removeElement(index);            
        },

        getListData: function (){
            return api.getListData();
        }
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

