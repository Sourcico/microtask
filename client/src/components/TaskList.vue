<template>

    <div id="item-list">
        <form method="POST" @submit.prevent="">
            <input type="text" v-model="itemName" v-if="!showParagraph" style="margin: 5px;" placeholder="Add new task">
            <input class="btn btn-success" v-on:click="addElement(itemName)" v-if="!showParagraph" type="submit" value="+">
            <ul>
                <li v-for="(item, index) in tasks" v-bind:key="index">
                    <router-link :to="{name: 'singleTask', params: {id:item._id}}"><TaskStep id="itm2" v-if="!showParagraph" data-toggle="modal" data-target="#myModal2" v-bind:name="item.name" style="margin: 2px;"></TaskStep></router-link>
                    <!-- <TaskStep id="itm2" v-if="!showParagraph" v-bind:name="item.name" data-toggle="modal" data-target="#myModal2" style="margin: 2px;"></TaskStep> -->
                    <input type="checkbox" id="checkbox2"  v-if="!showParagraph" style="margin: 1px;">
                    <button class="btn btn-danger" v-if="!showParagraph" v-on:click="removeElement(item._id)" style="margin: 1px;">x</button>
                   <br>
                </li>
                <button class="btn btn-info" v-if="!showParagraph" @click="showParagraph = !showParagraph" style="margin: 1px;" data-toggle="modal" data-target="#myModal">Edit</button>
            </ul>
        </form>

        <!-- MODAL 1 -->
        <div class="container">
          <div class="modal fade" id="myModal" role="dialog">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                    <h2>Edit Element</h2>
                    <button type="button" v-if="showParagraph" @click="showParagraph = !showParagraph" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body">
                    <ul>
                        <li v-for="(item, index) in tasks" v-bind:key="index">
                            <div id="showP" v-if="showParagraph">
                                <input type="text" v-model="item.name" style="margin: 2px;">
                            </div>
                            <router-link :to="{name: 'singleTask', params: {id:item._id}}"><TaskStep id="itm2" v-if="!showParagraph" v-bind:name="item.name" style="margin: 2px;"></TaskStep></router-link>
                            <input type="checkbox" id="checkbox2"  v-if="!showParagraph" style="margin: 1px;">
                            <button class="btn btn-danger" v-if="!showParagraph" v-on:click="removeElement(item._id)" style="margin: 1px;">Delete</button>
                            <button class="btn btn-success" data-dismiss="modal" v-on:click="updateElement(item._id, item.name)" v-if="showParagraph" @click="showParagraph = !showParagraph" style="margin: 1px;">Save</button>
                           <br>
                        </li>
                        
                        <button class="btn btn-info" v-if="!showParagraph" @click="showParagraph = !showParagraph" style="margin: 1px;" data-toggle="modal" data-target="#myModal">Edit</button>
                    </ul>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal" v-if="showParagraph" @click="showParagraph = !showParagraph">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- MODAL 2 -->
        <div class="container">
          <div class="modal fade" id="myModal2" role="dialog">
            <div class="modal-dialog">
              <!-- Modal content-->
              <div class="modal-content">
                <div class="modal-header">
                    <button type="button"  class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body">
                  Task ID is: {{ $route.params.id}}
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal" v-on:click="goHome()">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>

    </div>

</template>

<script>
import TaskStep from '@/components/TaskStep.vue';
//import json from '@/json/pr2.json';
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
            alert('New task added');
            this.tasks.push({name: itemName});
            return api.addElement(itemName);
        },

        updateElement: function(index, name){
            this.$router.push('/');
            this.tasks.splice(index);
            this.tasks.push({_id:index, name: name});
            return api.updateElement(index, {name: name});
        },

        removeElement: function(index){
            //this.$router.push('/');
            //window.location.reload();
            alert('Task is deleted');
            this.tasks.splice(index);
            return api.removeElement(index);
                        
        },

        getListData: function (){
            return api.getListData();
        },

        goHome: function (){
            this.$router.push('/');
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

