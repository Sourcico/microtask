<template>
  <div id="app">
    <!-- <div id="nav">
      <nav class="navbar navbar-default" >
        <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand">Task Lifecycle</a>
          </div>
            <router-link to="/" class="btn btn-dark">Home</router-link> 
            <router-link to="/about" class="btn btn-dark">About</router-link> 
            <router-link to="/page1" class="btn btn-dark">Page 1</router-link> 
            <router-link to="/page2" class="btn btn-dark">Page 2</router-link>
        </div>
      </nav>
    </div> -->
    <div class="btn-group btn-group-toggle" data-toggle="buttons">
      <label class="btn btn-secondary">
        <router-link to="/" class="btn btn-dark">Home</router-link>
      </label>
      <label class="btn btn-secondary">
        <router-link to="/about" class="btn btn-dark">About</router-link>
      </label>
      <label class="btn btn-secondary">
        <router-link to="/page1" class="btn btn-dark">Register</router-link>
      </label>
      <label class="btn btn-secondary">
        <router-link to="/page2" class="btn btn-dark">Login</router-link>
      </label>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
