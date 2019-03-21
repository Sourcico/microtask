<template>
    <div>
        <br><br>
        <h1> {{title}} </h1>

        <TaskDescription />
        <Task-list />
    </div>
</template>

<script>
import TaskDescription from '@/components/TaskDescription.vue';
import TaskList from '@/components/TaskList.vue';

export default {
    name: 'Task',
    props: {
        title: String
    },
    components: {
        TaskDescription,
        TaskList
    }
}
</script>

