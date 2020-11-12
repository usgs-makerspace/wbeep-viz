<template>
<div id="aboutContainer">
  <WorkInProgressWarning />
  <div id="aboutContent">
      About Page
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel faucibus quam. Fusce nulla mauris, aliquam ut ullamcorper vel, mollis et ex. Sed eu sapien felis. Aenean erat libero, accumsan ut lorem consequat, mattis fermentum purus. Sed mollis, dolor in faucibus venenatis, dui enim fringilla sem, a pretium tortor odio id ipsum. Aliquam rhoncus lorem dolor. Nulla imperdiet pretium erat in euismod. Donec porttitor rutrum nibh quis dapibus. Sed sit amet suscipit nisi, eu pellentesque magna. Cras sed lorem eu elit imperdiet sodales. Sed nec pulvinar diam. Quisque vulputate tincidunt sem eu eleifend. Nullam nec est ante. Etiam id tortor eleifend, molestie nunc eu, dignissim lectus. Sed vehicula in leo a cursus. Proin fringilla metus ut nisl porttitor ornare.</p>
  </div>
</div>
</template>

<script>
    import WorkInProgressWarning from "@/components/WorkInProgressWarning";
    export default {
        name: "About",
        components:{
          WorkInProgressWarning
        }
    }
</script>

<style scoped lang="scss">
  #aboutContainer{
    flex: 1;
  }
  #aboutContent{
    padding: 10px;
    max-width: 960px;
    margin:0 auto;
  }
</style>
