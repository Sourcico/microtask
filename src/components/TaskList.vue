<template>
    <div>
        <ul>
            <li v-for="(item, index) in items" v-bind:key="index">
                <TaskStep v-bind:name="item.message" /> 
            </li>
        </ul>
    </div>
</template>

<script>
import TaskStep from '@/components/TaskStep.vue';

export default {
    name: 'Task',
    components: {
        TaskStep
    },
    data () {
        return {
            items: [{ id: 1, message: 'Step One' }, { id: 2, message: 'Step Two' }]
        }
    }
}
</script>

<style scoped>
    ul {
        list-style-type: none;
        padding: 0;
    }
</style>

