<template>
  <div>
    hello element3-core

    <div>
      <Switch></Switch>
    </div>
  </div>
</template>

<script lang="ts">
import { Switch } from "../../dist/element3-core.esm.js";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {
    Switch,
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
