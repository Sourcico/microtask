<template>

    <div id="item-list">
        <form method="POST" @submit.prevent="">
            <input type="text" v-model="itemName" v-if="!showParagraph" style="margin: 5px;" placeholder="Add new task">
            <input class="btn btn-success" v-on:click="addElement(itemName)" v-if="!showParagraph" type="submit" value="+">
            <ul>
                <li v-for="(item, index) in tasks" v-bind:key="index">
                    <div id="showP" v-if="showParagraph">
                        <input type="text" v-model="item.name" style="margin: 2px;">
                    </div>
                    <router-link :to="{name: 'singleTask', params: {id:item._id}}"><TaskStep id="itm2" v-if="!showParagraph" v-bind:name="item.name" style="margin: 2px;"></TaskStep></router-link>
                    <input type="checkbox" id="checkbox2"  v-if="!showParagraph" style="margin: 1px;">
                    <button class="btn btn-danger" v-if="!showParagraph" v-on:click="removeElement(item._id)" style="margin: 1px;">Delete</button>
                    <button class="btn btn-success"  v-on:click="updateElement(item._id, item.name)" v-if="showParagraph" @click="showParagraph = !showParagraph" style="margin: 1px;">Save</button>
                   <br>
                </li>
                <button class="btn btn-info" v-if="!showParagraph" @click="showParagraph = !showParagraph" style="margin: 1px;">Edit</button>
                <button class="btn btn-danger" v-if="showParagraph" @click="showParagraph = !showParagraph" style="margin: 1px;">X</button>
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
            this.$router.push('/add');
            this.tasks.push({name: itemName });
            return api.addElement(itemName);
        },

        updateElement: function(index, name){
            this.$router.push('/edit');
            this.tasks.splice(index);
            this.tasks.push({_id:index, name: name});
            return api.updateElement(index, {name: name});
        },

        removeElement: function(index){
            this.$router.push('/delete');
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

