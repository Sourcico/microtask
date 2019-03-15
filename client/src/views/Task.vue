<template>
  <div class="singleTask">
    <h1>This is Single Task</h1>

    <p>
      Task ID is: {{ $route.params.id}}
    </p>
  </div>
</template>

<script>
	
export default{
	// data() {
	// 	return {
	// 		id: this.$route.params.id,
	// 		singleTask: {}
	// 	}
	// },
	// created() {
	// 	this.$http.get('http://localhost:8080/#/' + this.id).then(function(data){
	// 		this.singleTask = data.body;
	// 	});
	// }
}
	
</script>
