<template>
  <div class="page1">
  	<br>
  	<h3>Register Page</h3>
    <p>
      <form method="POST" @submit.prevent="">
            <input type="text" v-model="username" style="margin: 5px;" placeholder="username">
            <br>
            <input type="email" v-model="email" style="margin: 5px;" placeholder="email">
            <br>
            <input type="password" v-model="password" style="margin: 5px;" placeholder="password">
            <br>
             <input type="password" v-model="password2" style="margin: 5px;" placeholder="confirm password">
            <br>
            <input class="btn btn-success" v-on:click="addUser(username, email, password, password2)" type="submit" value="Register">
       </form>
    </p>
  </div>

</template>

  <script>
	  import api from './../services/api/api2.js';
	  	export default {
	    
		    data () {
		        return data;

		    },
		    methods: {
		        addUser: function(username, email, password, password2){
		        	alert('New user added');

		        	const data={
		        		username: username, 
		        		email: email,
		        		password: password
		        	};

	    	        return api.addUser(data);
		        }
		    }
		}
  </script>


