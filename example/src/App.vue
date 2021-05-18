<template>
  <div>
    hi element3-core
    <div>
      <div>
        <p>switch</p>
        <Switch></Switch>
      </div>

      <div>
        <p>button</p>
        <Button></Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Switch from "./components/Switch/Switch.vue";
import Button from "./components/Button/Button.vue";

export default defineComponent({
  name: "App",
  components: {
    Switch,
    Button,
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
