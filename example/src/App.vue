<template>
  <div>
    hi element3-core

    <SwitchDemo></SwitchDemo>
  </div>
</template>

<script lang="ts">
// import { Switch } from "element3-core";
import { defineComponent } from "vue";
import SwitchDemo from "./components/SwitchDemo.vue";

export default defineComponent({
  name: "App",
  components: {
    SwitchDemo,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
