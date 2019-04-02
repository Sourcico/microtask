<template>
  <div class="page2">
    <br>
    <h3>Login Page</h3>

      <form method="POST" @submit.prevent="login">
            <input type="text" v-model="username" style="margin: 5px;" placeholder="username">
            <br>
            <input type="text" v-model="password" style="margin: 5px;" placeholder="password">
            <br>
            <button class="btn btn-info" style="margin: 1px;" type="submit">Login</button>
       </form>

  </div>
</template>


