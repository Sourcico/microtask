<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Task title="task lifecycle"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Task from '@/components/Task.vue';

export default {
  name: 'home',
  components: {
    Task
  }
}
</script>
