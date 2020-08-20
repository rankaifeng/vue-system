<template>
  <div class="hello">
    <h1>{{ te }}</h1>
    <button @click="btnClick">按钮</button>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  setup(props) {
    const te = ref("ss");
    console.log(te);

    const btnClick = () => {
      console.log("44");
    };
    return {
      te,
      btnClick
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
