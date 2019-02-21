<template>

    <div id="item-list">
        <input type="text" v-model="itemName" style="margin: 5px;">
        <button class="btn btn-success" v-on:click="addElement()">+</button><br><br>
        <ul>
            <li v-for="(item, index) in myJson" v-bind:key="index">
                <div id="showP" v-if="showParagraph">
                    <input type="text" v-model="item.message" style="margin: 2px;">
                    <button>Save</button>
                </div>
                <TaskStep id="itm2" v-if="!showParagraph" v-bind:name="item.message" style="margin: 2px;"></TaskStep>
                <input type="checkbox" id="checkbox2"  v-if="!showParagraph" style="margin: 1px;">
                
                <button class="btn btn-danger" v-if="!showParagraph" v-on:click="removeElement(index)" style="margin: 1px;">Delete</button>
                <br>
            </li>
            <button class="btn btn-info" v-if="!showParagraph" @click="showParagraph = !showParagraph" style="margin: 1px;">Edit</button>
            <button class="btn btn-info" v-if="showParagraph" @click="showParagraph = !showParagraph" style="margin: 1px;">Cancel</button>
        </ul>
    </div>

</template>

<script>
import TaskStep from '@/components/TaskStep.vue';
import json from '@/json/pr2.json'


export default {
    name: 'Task',
    components: {
        TaskStep
    },
    data () {
        return {
            myJson: json.data2, 
            showParagraph: false
        }
    },

    methods: {
        removeElement: function(index){
            this.myJson.splice(index, 1);
        },
        addElement: function(){
            this.myJson.push({ id: 6, message: this.itemName });
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

