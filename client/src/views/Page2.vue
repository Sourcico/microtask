<template>
  <div class="page2">
    <br>
    <h3>Login Page</h3>
      <form method="POST" @submit.prevent="">
            <input type="text" v-model="username" style="margin: 5px;" placeholder="username">
            <br>
            <input type="text" v-model="password" style="margin: 5px;" placeholder="password">
            <br>
            <input class="btn btn-success" v-on:click="loginUser(username, password)" type="submit" value="Login">
       </form>
  </div>
</template>

<script>
    import api from './../services/api/api2.js';
      export default {
        // data () {
        //     return data;
        // },
        methods: {
            loginUser: function(username, password){
              console.log('in login function');
              //this.$router.push('/'); 
              const data={
                username: username,
                password: password
              };
              return api.loginUser(data);
            }
        }
      }
  </script> 


